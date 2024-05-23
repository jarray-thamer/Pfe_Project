import { useClerk } from "@clerk/nextjs";
import { Prompt } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface promptType {
  prompt: Prompt | null;
}

const EmptyMessage = ({ prompt }: promptType) => {
  const { user } = useClerk();
  return (
    <motion.div
      className="flex-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeIn",
        duration: 0.7,
      }}
    >
      <div className="mt-5 flex flex-col justify-center items-center ">
        <div>
          <Image
            src={prompt?.src ?? ""}
            alt="prompt logo"
            width={192}
            height={192}
          />
        </div>
        <div className="text-left text-6xl font-medium">
          <h1 className="my-4 inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500  to-purple-600">
            Hello, {user?.firstName}
          </h1>

          <h1 className="text-gray-600">How can I help you today?</h1>
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyMessage;
