import { auth, redirectToSignIn } from "@clerk/nextjs";
import React from "react";

import prismadb from "@/lib/prismadb";
import PromptForm from "@/components/prompt-form";

interface CodePageProps {
  params: {
    prompt: string;
  };
}

const CodePage = async ({ params }: CodePageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const res = await prismadb.prompt.findUnique({
    where: {
      id: params.prompt,
      userId: userId ?? "",
    },
  });

  return (
    <div className="w-full h-screen">
      <PromptForm initialData={res} />
    </div>
  );
};

export default CodePage;
