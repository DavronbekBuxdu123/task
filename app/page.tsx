import React from "react";
import prisma from "@/app/lib/db";
import Tasks, { Task } from "@/components/Tasks";

const Page = async () => {
  const tasks: Task[] = await prisma.task.findMany();
  return (
    <div>
      <Tasks data={tasks} />
    </div>
  );
};

export default Page;
