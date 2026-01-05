"use server";
import { withServerActionAsyncCatcher } from "@/lib/async-wrapper";
import { SuccessRespone } from "@/lib/success";
import { getUser } from "./user";
import axios from "axios";
import { TAxiosResponse, PingTask } from "@/types";
import { ServerActionsReturnType } from "@/types/api.types";
import { ErrorHandler } from "@/lib/error";

type GetPingResponse = {
  pings: PingTask[];
};

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080/api/v1";

const getPings = withServerActionAsyncCatcher(async () => {
  const user = await getUser();

  if (!user) return null;

  const response = await axios.get(`${BACKEND_URL}/ping/getall`, {
    headers: {
      Authorization: `Bearer ${user.signedToken}`,
    },
  });

  // Handle different response structures from backend
  let pingsData: GetPingResponse | null = null;

  // Case 1: Response has 'additional' field (expected structure)
  if (response.data?.additional) {
    const data: TAxiosResponse<GetPingResponse> = response.data;
    pingsData = data.additional;
  }
  // Case 2: Response has 'data' field containing pings
  else if (response.data?.data?.pings) {
    pingsData = { pings: response.data.data.pings };
  }
  // Case 3: Response has 'pings' directly
  else if (response.data?.pings) {
    pingsData = { pings: response.data.pings };
  }
  // Case 4: Response data itself is the pings array
  else if (Array.isArray(response.data)) {
    pingsData = { pings: response.data };
  }
  // Case 5: Response data is the GetPingResponse structure directly
  else if (response.data && typeof response.data === 'object') {
    pingsData = response.data as GetPingResponse;
  }

  if (!pingsData || !pingsData.pings) {
    console.log("Failed to fetch tasks: No data received. Response:", JSON.stringify(response.data, null, 2));
    // If response exists but structure is unexpected, throw an error
    if (response.data && Object.keys(response.data).length > 0) {
      throw new ErrorHandler(
        "Unexpected response structure from server. Please check the backend response format.",
        "INTERNAL_SERVER_ERROR"
      );
    }
    // If no data at all, return empty pings array (no tasks)
    pingsData = { pings: [] };
  }

  const actionResponse = new SuccessRespone(
    "Pings fetched successfully",
    200,
    pingsData
  );
  return actionResponse.serialize();
});

type AddTaskArgs = {
  url: string;
  discordUrl?: string;
};

type AddTaskResponse = {
  url: string;
  webhook: string;
};

const addTasks = withServerActionAsyncCatcher<
  AddTaskArgs,
  ServerActionsReturnType<AddTaskResponse>
>(async (data) => {
  try {
    const user = await getUser();
    if (!user || !data)
      throw new Error("Failed to add task: User not authencticated");

    if (!user.signedToken) throw new Error("Failed to add task: No token found");

    const response = await axios.post(
      `${BACKEND_URL}/ping/create`,
      {
        url: data.url,
        ...(data.discordUrl && { webhook: data.discordUrl }),
      },
      {
        headers: {
          Authorization: `Bearer ${user.signedToken}`,
        },
      }
    );

    const res = new SuccessRespone(
      "Task added successfully",
      200,
      response.data
    );
    return res.serialize();
  } catch (err: any) {
    console.log(err);
    console.log(err.response.data);
    throw new ErrorHandler(err.response?.data.details, "BAD_REQUEST");
  }
});

const reactivateTask = async ({ taskId }: { taskId: number }) => {
  try {
    const user = await getUser();
    if (!user || !taskId) {
      throw new Error("Failed to add task");
    }
    const response = await axios.patch(
      `${BACKEND_URL}/ping/reactivate`,
      { taskId: taskId },
      {
        headers: {
          Authorization: `Bearer ${user.signedToken}`,
        },
      }
    );

    const res = new SuccessRespone(
      "Task reactivated successfully",
      200,
      response.data
    );
    return res.serialize();
  } catch (err: any) {
    console.log(err);
    return null;
  }
};

const deleteTask = async ({ taskId }: { taskId: number }) => {
  try {
    const user = await getUser();
    if (!user || !taskId) throw new Error("Failed to delete task");

    const response = await axios.delete(`${BACKEND_URL}/ping/delete`, {
      headers: {
        Authorization: `Bearer ${user.signedToken}`,
      },
      data: {
        taskId: taskId,
      },
    });
    const res = new SuccessRespone(
      "Task deleted successfully",
      200,
      response.data
    );
    return res.serialize();
  } catch (err: any) {
    console.log(err);
    return null;
  }
};

export { getPings, addTasks, deleteTask, reactivateTask };
