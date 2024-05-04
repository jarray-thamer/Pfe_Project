import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, category, isPublic } = body;

    // Check if user exist
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if data is available
    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !category ||
      !(typeof isPublic !== "undefined")
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    // Create new Prompt in DB
    await prismadb.prompt.create({
      data: {
        name,
        description,
        instructions,
        category,
        src,
        isPublic,
        userId: user.id,
        userFirstName: user.firstName ?? "",
      },
    });

    return new NextResponse("create Done");
  } catch (error) {
    console.log("[PROMPT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
