import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/auth";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id))
    return NextResponse.json(
      { success: false, error: "Invalid id" },
      { status: 400 }
    );

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!post)
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id))
    return NextResponse.json(
      { success: false, error: "Invalid id" },
      { status: 400 }
    );

  try {
    const session = await getServerSession(authOptions as any);
    if (!session?.user?.email)
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user)
      return NextResponse.json(
        { success: false, error: "User not registered" },
        { status: 403 }
      );

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post)
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );

    // Only author can edit
    if (post.authorId !== user.id)
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );

    const body = await request.json();
    const data: any = {};
    if (typeof body.title === "string") data.title = body.title;
    if (typeof body.content === "string") data.content = body.content;

    if (Object.keys(data).length === 0)
      return NextResponse.json(
        { success: false, error: "No updatable fields" },
        { status: 400 }
      );

    const updated = await prisma.post.update({ where: { id }, data });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id))
    return NextResponse.json(
      { success: false, error: "Invalid id" },
      { status: 400 }
    );

  try {
    const session = await getServerSession(authOptions as any);
    if (!session?.user?.email)
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user)
      return NextResponse.json(
        { success: false, error: "User not registered" },
        { status: 403 }
      );

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post)
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );

    // Only author can delete
    if (post.authorId !== user.id)
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
