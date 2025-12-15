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

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080";

const getPings = withServerActionAsyncCatcher(async () => {
  const user = await getUser();

  if (!user) return null;

  const response = await axios.get(`${BACKEND_URL}/ping/getall`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const data: TAxiosResponse<GetPingResponse> = response.data;
  if (!response.data.additional) {
    console.log("Failed to fetch tasks : ", "No data received");
    return null;
  }

  const actionResponse = new SuccessRespone(
    "Pings fetched successfully",
    200,
    data.additional
  );
  return actionResponse;
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

    if (!user.token) throw new Error("Failed to add task: No token found");

    const response = await axios.post(
      `${BACKEND_URL}/ping/create`,
      {
        url: data.url,
        ...(data.discordUrl && { webhook: data.discordUrl }),
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
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
          Authorization: `Bearer ${user.token}`,
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
        Authorization: `Bearer ${user.token}`,
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
