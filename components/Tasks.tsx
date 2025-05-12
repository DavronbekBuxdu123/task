"use client";

import Image from "next/image";
import { MdDelete } from "react-icons/md";
import React, { useState } from "react";
import { FaCheck, FaHome, FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoIosMenu } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";

type Task = {
  id: number;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  important: boolean;
};

type TasksProps = {
  data: Task[];
};

export default function Tasks({ data }: TasksProps) {
  const [filter, setFilter] = useState<
    "all" | "completed" | "important" | "today"
  >("all");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [important, setImportant] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const router = useRouter();

  const createTask = async () => {
    const task = { title, description, date, completed, important };
    try {
      if (!selectedTaskId) {
        await axios.post("/api/users", task);
      } else {
        await axios.put(`/api/users/${selectedTaskId}`, task);
        setSelectedTaskId(null);
      }
      router.refresh();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setCompleted(false);
    setImportant(false);
    setIsOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/users/${id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (task: Task) => {
    setSelectedTaskId(task.id);
    setIsOpen(true);
    setCompleted(task.completed);
    setDescription(task.description);
    setTitle(task.title);
    setDate(task.date);
    setImportant(task.important);
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const isToday = (dateStr: string): boolean => {
    const today = new Date();
    const date = new Date(dateStr);
    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  };

  const filteredTasks = data.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "important") return task.important;
    if (filter === "today") return isToday(task.date);
    return false;
  });

  const renderSidebar = () => (
    <div className="space-y-4 text-white">
      <div className="flex items-center gap-x-4 mb-4">
        <Image
          className="rounded-full"
          src="/img.jpg"
          width={60}
          height={60}
          alt="photo"
        />
        <h4>
          Aslonov <br /> Davronbek
        </h4>
      </div>
      <div
        onClick={() => setFilter("all")}
        className={`flex items-center gap-2 cursor-pointer ${
          filter === "all" ? "text-green-500 font-bold" : ""
        }`}
      >
        <FaHome /> All Tasks
      </div>
      <div
        onClick={() => setFilter("important")}
        className={`flex items-center gap-2 cursor-pointer ${
          filter === "important" ? "text-green-500 font-bold" : ""
        }`}
      >
        <IoIosMenu /> Important
      </div>
      <div
        onClick={() => setFilter("completed")}
        className={`flex items-center gap-2 cursor-pointer ${
          filter === "completed" ? "text-green-500 font-bold" : ""
        }`}
      >
        <FaCheck /> Completed
      </div>
      <div
        onClick={() => setFilter("today")}
        className={`flex items-center gap-2 cursor-pointer ${
          filter === "today" ? "text-green-500 font-bold" : ""
        }`}
      >
        <CiCalendarDate /> Do it now
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1  sm:grid-cols-[250px_1fr] min-h-screen text-white">
      <div className="hidden sm:block bg-neutral-900 border-r p-4 sm:p-6 h-full overflow-y-auto">
        {renderSidebar()}
      </div>

      <div className="relative bg-neutral-800 p-4 w-full mx-auto">
        <div className="sm:hidden flex justify-between items-center mb-4">
          <button onClick={() => setSidebarOpen(true)}>
            <IoIosMenu size={28} />
          </button>
          <h1 className="text-xl font-bold  sm:block">
            {filter === "today"
              ? "Today’s Tasks"
              : filter === "completed"
              ? "Completed Tasks"
              : filter === "important"
              ? "Important Tasks"
              : "All Tasks"}
          </h1>
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex">
            <div className="w-64 bg-neutral-900 p-4 h-full overflow-y-auto">
              {renderSidebar()}
            </div>
            <div className="flex-1" onClick={() => setSidebarOpen(false)} />
          </div>
        )}

        <h1 className="text-xl font-bold mb-4 hidden sm:block px-4">
          {filter === "today"
            ? "Today’s Tasks"
            : filter === "completed"
            ? "Completed Tasks"
            : filter === "important"
            ? "Important Tasks"
            : "All Tasks"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full p-4 ">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="h-[300px] hover:bg-neutral-600  max-w-[300px] w-full relative rounded-2xl p-4 border bg-neutral-700"
            >
              <h4 className="text-lg font-semibold">{task.title}</h4>
              <p className="text-sm mt-2">{task.description}</p>
              <p className="text-xs mt-1 text-gray-300 absolute bottom-15">
                {formatDate(task.date)}
              </p>
              <div className="">
                <div className="flex items-center justify-between mt-4  ">
                  <div className="absolute bottom-6">
                    <button
                      className={`px-3 py-1 rounded ${
                        task.completed ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {task.completed ? "Completed" : "Incomplete"}
                    </button>
                  </div>
                  <div className="flex gap-2 absolute bottom-8 right-4 ">
                    <FaRegEdit
                      className="cursor-pointer hover:text-yellow-500"
                      onClick={() => handleUpdate(task)}
                      size={20}
                    />
                    <MdDelete
                      className="cursor-pointer hover:text-red-600"
                      onClick={() => handleDelete(task.id)}
                      size={20}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div
            onClick={() => setIsOpen(true)}
            className="h-[300px] cursor-pointer rounded-2xl p-4 border bg-neutral-700 flex items-center justify-center text-2xl hover:bg-neutral-600 transition"
          >
            + Add New Task
          </div>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-neutral-800 p-6 rounded-lg w-full max-w-md shadow-lg relative">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold ">
                  {selectedTaskId ? "Edit Task" : "Create Task"}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500"
                >
                  ✖
                </button>
              </div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title..."
                className="form-control w-full p-2 mt-4 rounded"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control w-full p-2 mt-4 rounded"
                placeholder="Description"
              />
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                className="form-control w-full p-2 mt-4 rounded"
              />
              <div className="mt-4 flex items-center justify-between">
                <label htmlFor="task1" className="flex gap-2 items-center">
                  <input
                    id="task1"
                    type="checkbox"
                    checked={important}
                    onChange={(e) => setImportant(e.target.checked)}
                  />
                  Important
                </label>
                <label htmlFor="task2" className="flex gap-2 items-center">
                  <input
                    id="task2"
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                  />
                  Completed
                </label>
              </div>
              <button
                onClick={createTask}
                className="w-full mt-4 py-2 bg-success rounded "
              >
                {selectedTaskId ? "Update Task" : "+ Create Task"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
