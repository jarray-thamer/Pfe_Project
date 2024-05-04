import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { chatName, prompt } = body;

    const user = await currentUser();
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!chatName) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newChatHistory = await prismadb.chatHistory.create({
      data: {
        userId: user.id,
        name: chatName,
        userFirstName: prompt?.userFirstName ?? "",
        promptId: prompt?.id,
      },
    });
    return NextResponse.json({
      message: "create chatHistory Done",
      newChatHistory,
    });
  } catch (error) {
    console.log("[CHAT-CONVERSATION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
