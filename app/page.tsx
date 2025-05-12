import React from "react";
import prisma from "@/app/lib/db";
import Tasks from "@/components/Tasks";

const Page = async () => {
  const users = await prisma.task.findMany();
  return (
    <div>
      <Tasks data={users} />
    </div>
  );
};

export default Page;
