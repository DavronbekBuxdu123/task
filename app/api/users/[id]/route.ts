import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { title, description, date, completed, important } = await req.json();
  try {
    const updatedUser = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description, date, completed, important },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: "deleted" });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
