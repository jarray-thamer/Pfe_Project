"use client";

import { BeatLoader, ClipLoader } from "react-spinners";
import { Clipboard, Copy, DownloadIcon } from "lucide-react";

import axios from "axios";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useState } from "react";

export interface ChatMessageProps {
  role: "system" | "user" | "assistant";
  msgContent?: string;
  isLoading?: boolean;
  src?: string;
  id?: string;
}

export const ChatMessage = ({
  role,
  msgContent,
  isLoading,
  src,
  id,
}: ChatMessageProps) => {
  const { toast } = useToast();
  const [isPdfGenLoading, setIsPdfGenLoading] = useState(false);

  const onCopy = () => {
    if (!msgContent) {
      return;
    }

    navigator.clipboard.writeText(msgContent);
    toast({
      description: "Message copied to clipboard.",
      duration: 3000,
    });
  };

  const createPdf = () => {
    setIsPdfGenLoading(true);
    const md = new markdownit();
    const markdownString = msgContent;
    const htmlContent = md.render(markdownString);
    const options = {
      method: "POST",
      url: "https://api.pdfendpoint.com/v1/convert",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer pdfe_live_69faf1ab8d48f71328748145bc8dec18f0e6",
      },
      data: JSON.stringify({
        html: `<html><body style="" >${htmlContent}</body></html>`,
        filename: "wall-e_document.pdf",
        orientation: "vertical",
        page_size: "A4",
        margin_top: "1cm",
        margin_bottom: "1in",
        margin_left: "20px",
        margin_right: "20px",
        css: "code {\n\n  font-family: monospace; \n  background-color: #f5f5f5;\n  padding: 2px 5px;\n  border-radius: 3px;\n}",
      }),
    };

    axios
      .request(options)
      .then(function (response) {
        setIsPdfGenLoading(false);
        window.open(`${response.data.data.url}`, "_blank");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div
      className={cn(
        "group flex items-start gap-x-3 py-4 px-2 rounded-3xl w-full  ",
        role === "user" && "justify-end bg-slate-400/5"
      )}
    >
      {role !== "user" && src && <BotAvatar src={src} />}
      <div className="rounded-md px-4 py-2  text-base bg-primary/10">
        {isLoading ? (
          <BeatLoader size={5} />
        ) : (
          <div className="p-1">
            <ReactMarkdown
              components={{
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <div className="flex-1 overflow-auto w-full font-medium border border-gray-300 my-2 p-2  rounded-lg bg-black/10">
                      <SyntaxHighlighter
                        style={vscDarkPlus as any}
                        language="tsx"
                        showLineNumbers
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(String(children));
                          toast({
                            description: "Code copied to clipboard.",
                            duration: 3000,
                          });
                        }}
                        className="text-black "
                        size="icon"
                        variant="ghost"
                      >
                        <Clipboard className="w-4 h-4 " />
                      </Button>
                    </div>
                  ) : (
                    <code
                      className={cn("bg-black/10 rounded-lg", className)}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {msgContent || ""}
            </ReactMarkdown>
          </div>
        )}
      </div>
      {role === "user" && <UserAvatar />}
      {role !== "user" && !isLoading && (
        <div className="flex flex-col">
          <Button
            onClick={onCopy}
            className="opacity-0 group-hover:opacity-100 transition"
            size="icon"
            variant="ghost"
          >
            <Copy className="w-4 h-4" />
          </Button>
          {isPdfGenLoading ? (
            <Button
              variant={"ghost"}
              size={"icon"}
              className="opacity-0 group-hover:opacity-100 transition cursor-default"
            >
              <ClipLoader size={20} />
            </Button>
          ) : (
            <Button
              variant={"ghost"}
              size={"icon"}
              className="opacity-0 group-hover:opacity-100 transition"
              onClick={createPdf}
            >
              <DownloadIcon className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
