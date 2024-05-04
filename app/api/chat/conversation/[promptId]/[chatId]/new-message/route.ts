import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const body = await req.json();
    const { userMessage } = body;

    const user = await currentUser();
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!userMessage) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newMessage = await prismadb.messages.create({
      data: {
        content: userMessage,
        role: "user",
        userFirstName: user?.firstName ?? "",
        userId: user?.id ?? "",
        chatHistoryId: params.chatId,
      },
    });

    return NextResponse.json({ newMessage });
  } catch (error) {
    console.log("[CHAT-CONVERSATION-NEW-USER-MESSAGE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
