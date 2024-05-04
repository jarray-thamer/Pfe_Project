"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { Messages, Prompt } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "./chatMessage";

interface ChatMessagesProps {
  messages: ChatMessageProps[] | null;
  isLoading: boolean;
  prompt: Prompt | null;
}

export const ChatMessages = ({
  messages = [],
  isLoading,
  prompt,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  const [fakeLoading, setFakeLoading] = useState(
    messages?.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.length]);

  return messages?.length !== 0 ? (
    <div className="flex-1 overflow-y-auto ">
      {messages?.map((message: any) => (
        <ChatMessage
          id={message.id}
          key={message.id}
          src={prompt?.src ?? ""}
          msgContent={message.content}
          role={message.role}
        />
      ))}
      {isLoading && (
        <ChatMessage src={prompt?.src ?? ""} role="system" isLoading />
      )}
      <div ref={scrollRef} />
    </div>
  ) : (
    <></>
  );
};
