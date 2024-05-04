"use client";
import { Prompt } from "@prisma/client";

import Image from "next/image";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import axios from "axios";
import { motion } from "framer-motion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface PromptProps {
  data: Prompt[];
}
export const Prompts = ({ data }: PromptProps) => {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <div className="h-full p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-6">
      {data.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 1 }}
        >
          <Card className="hover:bg-indigo-50/40">
            <CardHeader>
              <CardTitle className="flex flex-row items-center justify-between text-base text-black/75">
                {item.name}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="p-1 rounded-full hover:bg-gray-300/50 ">
                      <MoreVertical className="cursor-pointer w-5 h-5 " />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(`${item.category}/prompt/${item.id}`)
                      }
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500 cursor-pointer"
                      onClick={async () => {
                        try {
                          await axios.delete(`/api/prompt/${item.id}`);
                          toast({
                            description: "✅ Success.",
                          });
                          router.refresh();
                        } catch (error) {
                          toast({
                            variant: "destructive",
                            description: "❌ Something went wrong.",
                          });
                        }
                      }}
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
            </CardHeader>
            <CardContent
              onClick={() =>
                router.push(
                  `/wall-e/${item.category}/chat/${item.id}/:new-chat`
                )
              }
              className="cursor-pointer flex flex-col justify-center items-center"
            >
              <div className="relative w-24 h-24">
                <Image
                  fill
                  className="rounded-lg object-cover"
                  src={item.src}
                  alt="Prompt Image"
                />
              </div>
              <Separator className="mt-2" />
              <div className="flex flex-row w-full justify-between items-center text-center text-muted-foreground mt-2 text-sm">
                <p>{item.description}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
