"use client";

import { ChatHistory, Messages, Prompt } from "@prisma/client";

import { ChatMessages } from "@/components/chatMessages";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SendHorizonal } from "lucide-react";
import EmptyMessage from "@/components/EmptyMessage";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface ChatClientProps {
  prompt: Prompt | null;
  messages: Messages[];
  chatHistory: ChatHistory[];
  params: { chatId: String };
}

const ChatClient = ({
  prompt,
  messages,
  chatHistory,
  params,
}: ChatClientProps) => {
  const formSchema = z.object({
    promptMessage: z.string().min(1, {
      message: "Your message is required.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      promptMessage: "",
    },
  });

  const router = useRouter();
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let chatHistoryId = params.chatId;
    if (params.chatId === "%3Anew-chat") {
      const newChatName = "Chat " + (chatHistory.length + 1);

      const newChatRecord = await axios.post(`/api/chat/conversation`, {
        chatName: newChatName,
        prompt,
      });
      chatHistoryId = newChatRecord.data.newChatHistory.id;
      router.replace(
        `/wall-e/${prompt?.category}/chat/${prompt?.id}/${newChatRecord.data.newChatHistory.id}`
      );
    }
    router.refresh();
    await axios.post(
      `/api/chat/conversation/${prompt?.id}/${chatHistoryId}/new-message`,
      { userMessage: values.promptMessage }
    );

    router.refresh();
    await axios.post(`/api/chat/conversation/${prompt?.id}/${chatHistoryId}`, {
      messageFromUser: values.promptMessage,
    });
    form.reset();
    router.refresh();
  };

  return (
    <div className="flex flex-col w-full max-h-screen h-screen p-4 px-10 space-y-2  ">
      {messages.length === 0 && <EmptyMessage prompt={prompt} />}
      {messages.length !== 0 && (
        <ChatMessages
          isLoading={isLoading}
          messages={messages}
          prompt={prompt}
        />
      )}
      <Separator />

      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="focus-within:ring-2 rounded-full flex flex-row justify-between items-center w-3/4 px-7 py-1.5 border"
          >
            <FormField
              name="promptMessage"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormControl className="">
                    <Textarea
                      placeholder="Entre your prompt here"
                      className="resize-none border-none focus-within:shadow-sm px-6 py-4 focus-visible:ring-transparent scroll-smooth "
                      rows={1}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              variant={"ghost"}
              className=""
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              <SendHorizonal className="w-6 h-6 text-gray-600" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChatClient;
