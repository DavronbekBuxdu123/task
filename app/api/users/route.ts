import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, description, date, completed, important } = await req.json();

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        date: new Date(date),
        completed,
        important,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Serverda xatolik" }, { status: 500 });
  }
}
