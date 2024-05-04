import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";

import { NextResponse } from "next/server";

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(
  req: Request,
  { params }: { params: { promptId: string; chatId: string } }
) {
  console.log("object");
  try {
    const body = await req.json();
    const { messageFromUser } = body;

    const user = await currentUser();
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messageFromUser) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const prompt = await prismadb.prompt.findUnique({
      where: {
        id: params.promptId,
      },
    });

    if (!prompt) {
      return new NextResponse("Prompt not found", { status: 404 });
    }

    const prevMessages = await prismadb.messages.findMany({
      where: { chatHistoryId: params.chatId },
      select: { role: true, content: true },
      orderBy: { createdAt: "desc" },
    });
    const chatCompletionMessages: Array<{
      role: string;
      content: string;
    }> = [{ role: "system", content: prompt.instructions }];
    prevMessages.map((message) => {
      chatCompletionMessages.push(message);
    });
    chatCompletionMessages.push({ role: "user", content: messageFromUser });
    const chatCompletion = await openai.chat.completions.create({
      messages: chatCompletionMessages,
      model: "gpt-3.5-turbo-0125",
    });

    if (chatCompletion) {
      const newMessage = await prismadb.messages.create({
        data: {
          content: chatCompletion.choices[0].message.content ?? "",
          role: chatCompletion.choices[0].message.role,
          userFirstName: user?.firstName ?? "",
          userId: user?.id ?? "",
          chatHistoryId: params.chatId,
        },
      });
      return NextResponse.json({ newMessage });
    }
  } catch (error) {
    console.log("[CHAT-CONVERSATION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
