import ChatHistory from "@/components/chatHistory";
import prismadb from "@/lib/prismadb";
import ChatClient from "./components/client";
import { auth } from "@clerk/nextjs";

interface ChatPageProps {
  params: {
    promptchatId: string;
    chatId: string;
  };
}

const page = async ({ params }: ChatPageProps) => {
  const { userId } = auth();
  const chatsHistory = await prismadb.chatHistory.findMany({
    where: { promptId: params.promptchatId.toString(), userId: userId ?? "" },
    include: { chatMessages: true },
    orderBy: { createdAt: "desc" },
  });
  const chatsMessages = await prismadb.messages.findMany({
    where: { chatHistoryId: params.chatId.toString(), userId: userId ?? "" },
    orderBy: { createdAt: "asc" },
  });

  const prompt = await prismadb.prompt.findUnique({
    where: { id: params.promptchatId.toString() },
  });

  return (
    <div className=" flex h-full w-full">
      <ChatHistory data={chatsHistory} prompt={prompt} />
      <ChatClient
        prompt={prompt}
        chatHistory={chatsHistory}
        messages={chatsMessages}
        params={params}
      />
    </div>
  );
};

export default page;
