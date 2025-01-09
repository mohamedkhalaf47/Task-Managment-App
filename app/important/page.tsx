"use client"
import React from "react";
import { useGlobalState } from "../Context/GlobalContextProvider";
import Tasks from "../Components/Tasks/Tasks";

const page = () => {
  const { importantTasks } = useGlobalState();
  return <Tasks title="Important Tasks" tasks={importantTasks} />;
}

export default page