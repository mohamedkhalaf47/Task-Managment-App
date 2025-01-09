"use client"
import React from 'react';
import { useGlobalState } from "../../Context/GlobalContextProvider";
import { edit, trash } from "@/app/utils/icons";
import formatDate from "@/app/utils/formatDate";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
}

const TaskItem = ({title,description,date,isCompleted,id}: Props) => {
  const { deleteTask,updateTask } = useGlobalState();
  return (
    <div className="p-5 rounded-2xl bg-[#f9f9f914] shadow-[1px_7px_12px_rgba(8,18,69,0.1)] border-2 border-solid border-[#f9f9f914] h-64 flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p>{description}</p>
      <p className="mt-auto">{formatDate(date)}</p>
      <div className="flex items-center gap-5 ">
        {isCompleted ? (
          <button
            className="inline-block py-2 px-4 bg-[#27AE60] rounded-[30px]"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              updateTask(task);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="inline-block py-2 px-4 bg-[#fe6854] rounded-[30px]"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              updateTask(task);
            }}
          >
            InComplete
          </button>
        )}
        <button className="border-none outline-none cursor-pointer ml-auto">
          {edit}
        </button>
        <button
          className="border-none outline-none cursor-pointer"
          onClick={() => {
            deleteTask(id);
          }}
        >
          {trash}
        </button>
      </div>
    </div>
  );
}

export default TaskItem