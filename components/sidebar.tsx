"use client";

import { UserButton, useClerk } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Code,
  MessageSquare,
  PlusSquare,
} from "lucide-react";
import { cn } from "../lib/utils";
import Link from "next/link";

const ai = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/wall-e/conversation",
  },

  {
    label: "Code Generation",
    icon: Code,
    href: "/wall-e/code",
  },
  {
    label: "Create Companion",
    icon: PlusSquare,
    href: "/wall-e/createprompt/prompt/new-prompt",
  },
];

const SideBar = () => {
  const { user } = useClerk();
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <div className="h-full pt-4 flex flex-col bg-white border-r shadow-sm">
      <div className="p-4 pb-2 flex justify-between items-center">
        <Link href={"/wall-e"}>
          <h3
            className={`text-lg  font-bold overflow-hidden transition ${
              expanded ? "w-40" : "w-0 h-0"
            }`}
          >
            Wall-e
          </h3>
        </Link>
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="p-1.5 rounded-lg  hover:bg-gray-100"
        >
          {expanded ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>
      <div className="space-y-1 h-full mx-2 border-t mt-2">
        {ai.map((ai) => (
          <Link
            href={ai.href}
            key={ai.href}
            className={cn(
              "flex justify-start p-3 my-1 font-medium rounded-md cursor-pointer transition-colors group",
              pathname.startsWith(ai.href)
                ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                : "hover:bg-indigo-50 text-gray-600"
            )}
          >
            <div className="flex items-center flex-1">
              <ai.icon className={``} />
              <span
                className={`overflow-hidden transition-all ${
                  expanded ? "w-40 ml-3" : "w-0 h-0"
                }`}
              >
                {ai.label}
              </span>
              {!expanded && (
                <span
                  className={`
                      absolute  rounded-md px-2 py-1 ml-14
                    bg-indigo-100 text-indigo-800 text-sm
                      invisible opacity-20 -translate-x-3 transition-all
                      group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                      `}
                >
                  {ai.label}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
      <div className="border-t flex p-3">
        <UserButton afterSignOutUrl="/" />
        <div
          className={`
              flex justify-between items-center
              overflow-hidden transition-all ${
                expanded ? "w-40 ml-3" : "w-0 h-0"
              }
          `}
        >
          <div className="leading-4">
            <h4 className="font-semibold">{user?.fullName}</h4>
            <span className="text-xs text-gray-600">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
