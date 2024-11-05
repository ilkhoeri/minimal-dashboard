import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const userId = (await params).userId;
    const session = await auth();
    const body = await req.json();

    const { image } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const avatar = await db.user.updateMany({
      where: {
        id: userId
      },
      data: {
        image
      }
    });

    return NextResponse.json(avatar);
  } catch (error) {
    console.log("[IMAGE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const userId = (await params).userId
    const session = await auth();
    const body = await req.json();

    const { image } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const avatar = await db.user.deleteMany({
      where: {
        id: userId,
        image
      }
    });

    return NextResponse.json(avatar);
  } catch (error) {
    console.log("[IMAGE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
