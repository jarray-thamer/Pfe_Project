import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { promptId: string } }
) {
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
    await prismadb.prompt.update({
      where: {
        id: params.promptId,
        userId: user.id,
      },
      data: {
        userId: user.id,
        userFirstName: user.firstName?.toString(),
        src,
        name,
        category,
        description,
        instructions,
        isPublic,
      },
    });

    return new NextResponse("update Done");
  } catch (error) {
    console.log("[PROMPT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { promptId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prismadb.prompt.delete({
      where: {
        userId,
        id: params.promptId,
      },
    });

    return NextResponse.json("Delete done");
  } catch (error) {
    console.log("[COMPANION_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
