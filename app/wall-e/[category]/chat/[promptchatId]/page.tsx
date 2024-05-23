import ChatHistory from "@/components/chatHistory";
import prismadb from "@/lib/prismadb";
import Image from "next/image";

interface ChatPageProps {
  params: {
    promptchatId: String;
  };
}

const Page = async ({ params }: ChatPageProps) => {
  const prompt = await prismadb.prompt.findUnique({
    where: { id: params.promptchatId.toString() },
  });

  const chatsHistory = await prismadb.chatHistory.findMany({
    where: { promptId: params.promptchatId.toString() },
    include: { chatMessages: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="flex">
      <ChatHistory data={chatsHistory} prompt={prompt} />
      <div className="flex flex-col w-full justify-center items-center">
        <h5>{prompt?.name}</h5>
        <Image
          src={prompt?.src as string}
          width={92}
          height={92}
          alt="prompt image"
        />
        <p>{prompt?.description}</p>
      </div>
    </div>
  );
};

export default Page;
