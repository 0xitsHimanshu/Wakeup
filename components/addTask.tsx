"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Globe, Bell, MessageSquare, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { addTasks } from "@/app/actions/task";

const formSchema = z.object({
  url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .refine((val) => val.startsWith("https://"), {
      message: "URL must start with https://",
    }),
  notify: z.boolean().optional(),
  discordUrl: z
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .optional()
    .refine(
      (val) => !val || val.startsWith("https://discord.com/api/webhooks/"),
      {
        message:
          "Discord URL must start with https://discord.com/api/webhooks/",
      }
    ),
});

interface AddTaskFormProps {
  onSuccess?: () => void;
}

export default function AddTaskForm({ onSuccess }: AddTaskFormProps) {
  const [showDiscordInput, setShowDiscordInput] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      notify: false,
      discordUrl: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const addTaskRes = await addTasks(values);
      if (!addTaskRes.status) {
        throw new Error(addTaskRes.message);
      }

      toast.success("Task added successfully", {
        description: "We will start monitoring the url shortly.",
      });
      await queryClient.invalidateQueries({ queryKey: ["pingTask"] });
      form.reset();
      onSuccess?.();
    } catch (err: any) {
      toast.error("Task failed to add", {
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Notification Info */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-red-200">
          By default, we will send an email notification if this server returns any status code other than 200.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#E8E6E3]">Server URL</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E8E6E3]/40" />
                    <Input
                      placeholder="https://example.com"
                      {...field}
                      className="pl-10 bg-white/5 border-white/10 text-[#E8E6E3] placeholder:text-[#E8E6E3]/40 focus-visible:ring-white/20"
                    />
                  </div>
                </FormControl>
                <FormDescription className="text-[#E8E6E3]/60">
                  Enter the URL of the server you want to monitor.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notify"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base text-[#E8E6E3]">
                    Discord Notifications
                  </FormLabel>
                  <FormDescription className="text-[#E8E6E3]/60">
                    Receive notifications via Discord when server status changes.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      setShowDiscordInput(checked);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {showDiscordInput && (
            <FormField
              control={form.control}
              name="discordUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#E8E6E3]">Discord Webhook URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E8E6E3]/40" />
                      <Input
                        placeholder="https://discord.com/api/webhooks/..."
                        {...field}
                        className="pl-10 bg-white/5 border-white/10 text-[#E8E6E3] placeholder:text-[#E8E6E3]/40 focus-visible:ring-white/20"
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="text-[#E8E6E3]/60">
                    Enter your Discord webhook URL to receive notifications.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button 
            onClick={form.handleSubmit(handleSubmit)} 
            className="w-full bg-primary text-black hover:bg-primary/90 font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Task"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}