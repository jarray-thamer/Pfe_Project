"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, MessageSquare, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation Companions",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "wall-e/conversation",
  },
  {
    label: "Code Generation Companions",
    icon: Code,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "wall-e/code",
  },
  {
    label: "Create new Companions",
    icon: PlusCircle,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "wall-e/createprompt/prompt/new-prompt",
  },
];

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full h-full text-center items-center justify-start pt-4">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl font-semibold ">Explore Wall-E</h2>
        <p className="text-muted-foreground font-light text-lg">
          Select or create AI Companion - Experience the sharing feature
        </p>
      </div>
      <div className="px-4 space-y-4 w-2/3 xl:w-1/3">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.label}
            className="p-4  border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
