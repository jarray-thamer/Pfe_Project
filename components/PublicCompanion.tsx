"use client";
import { Prompt } from "@prisma/client";

import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";

import { motion } from "framer-motion";

import { Avatar, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";

interface PromptProps {
  data: Prompt[];
}
export const PublicCompanion = ({ data }: PromptProps) => {
  const router = useRouter();

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
              <div className="flex flex-col w-full justify-start items-center text-center text-muted-foreground mt-2 text-sm">
                <p className="text-center">{item.description}</p>
                <div className="flex items-center mt-1">
                  <p className="flex items-center capitalize mx-auto">
                    <User className="w-4 h-4 mr-2" /> by: {item.userFirstName}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
