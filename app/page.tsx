import React from "react";
import prisma from "@/app/lib/db";
import Tasks from "@/components/Tasks";
import { Task } from "@prisma/client";

const Page = async () => {
  const tasks: Task[] = await prisma.task.findMany();

  return (
    <div>
      <Tasks data={tasks} />
    </div>
  );
};

export default Page;
