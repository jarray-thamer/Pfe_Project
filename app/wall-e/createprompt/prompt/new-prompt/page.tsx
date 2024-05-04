import { auth, redirectToSignIn } from "@clerk/nextjs";
import React from "react";

import PromptForm from "@/components/prompt-form";

const CodePage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  return (
    <div className="w-full h-screen">
      <PromptForm initialData={null} />
    </div>
  );
};

export default CodePage;
