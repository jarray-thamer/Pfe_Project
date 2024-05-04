"use client";
import { cn } from "@/lib/utils";
import { MessageCircle, MoreVertical, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import axios from "axios";
import { useToast } from "./ui/use-toast";

const ChatHistory = ({ prompt, data }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  return (
    data && (
      <div className=" h-screen flex flex-col bg-white border-r shadow-sm w-48 ">
        <div className=" border-b p-4 pb-2 flex justify-between items-center w-full">
          <div
            onClick={() => {
              router.push(
                `/wall-e/${prompt.category}/chat/${prompt.id}/:new-chat`
              );
            }}
            className="hover:bg-gray-200/25 cursor-pointer flex w-full items-center justify-center p-2 my-2 rounded-md border-dashed border-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            new chat
          </div>
        </div>
        <div className="flex flex-col space-y-1 max-h-full mx-2 mt-2 overflow-auto">
          {data.map((history: any) => (
            <Link
              key={history.id}
              className={cn(
                "hover:bg-gray-200/25 p-2 rounded-lg flex justify-between items-center",
                pathname.endsWith(`/${history.id}`) ? "bg-indigo-400/15" : ""
              )}
              href={`/wall-e/${prompt.category}/chat/${history.promptId}/${history.id}`}
            >
              <div className="flex items-center">
                <div className="flex items-center mr-3 space-y-4">
                  {history.chatMessages.length}
                  <MessageCircle className="w-4 h-4 mx-1.5" />
                </div>
                {history.name}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="p-1 rounded-full hover:bg-gray-300/50 ">
                    <MoreVertical className="cursor-pointer w-5 h-5 " />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="cursor-pointer text-red-500 hover:underline "
                    onClick={async () => {
                      try {
                        await axios.delete(`/api/chat/${history.id}`);
                        toast({
                          description: "Success.",
                          duration: 2000,
                        });
                        if (
                          pathname ===
                          `/wall-e/${prompt.category}/chat/${history.promptId}/${history.id}`
                        ) {
                          router.push(
                            `/wall-e/${prompt.category}/chat/${history.promptId}/:new-chat`
                          );
                        } else {
                          router.back();
                        }
                        router.refresh();
                      } catch (error) {
                        toast({
                          variant: "destructive",
                          description: "Something went wrong.",
                          duration: 2000,
                        });
                      }
                    }}
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Link>
          ))}
        </div>
      </div>
    )
  );
};

export default ChatHistory;
