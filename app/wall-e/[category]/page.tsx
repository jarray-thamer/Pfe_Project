import EmptyPrompt from "@/components/EmptyPrompt";
import { PublicCompanion } from "@/components/PublicCompanion";
import { Prompts } from "@/components/prompts";
import { Separator } from "@/components/ui/separator";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { OctagonAlert } from "lucide-react";

interface ParamsProps {
  params: {
    category: "code" | "conversation";
  };
}

const CodePage = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  const publicData = await prismadb.prompt.findMany({
    where: {
      category: params.category,
      NOT: { userId: userId ?? "" },
      isPublic: true,
    },
    orderBy: { createdAt: "desc" },
  });
  const data = await prismadb.prompt.findMany({
    where: {
      userId: userId ?? "",
      category: params.category,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="h-full p-4 space-y-2">
      <div className="">
        <div>
          <h1 className="text-black/80 text-lg font-semibold">
            Your companions
          </h1>
          <p className="text-black/60 text-base ">
            AI companion created by you
          </p>
          <Separator />
        </div>
        {data.length ? (
          <div>
            <Prompts data={data} />
          </div>
        ) : (
          <EmptyPrompt />
        )}
      </div>
      <div>
        <div>
          <h1 className="text-black/80 text-lg font-semibold">
            Public companions
          </h1>
          <p className="text-black/60 text-base ">
            AI companion created from others user
          </p>
          <Separator />
        </div>
        {publicData.length ? (
          <PublicCompanion data={publicData} />
        ) : (
          <div className="mt-4">
            <p className="text-black/50 flex justify-center items-center">
              <OctagonAlert className="w-4 h-4 mx-4 mt-0.5" /> Looks like there
              is no public companion for now !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePage;
