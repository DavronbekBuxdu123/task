import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, description, date, completed, important } = await req.json();
  try {
    const updatedUser = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description, date, completed, important },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: "deleted" });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 400 });
  }
}
