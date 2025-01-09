"use client";
import React from "react";
import { useGlobalState } from "../Context/GlobalContextProvider";
import Tasks from "../Components/Tasks/Tasks";

const page = () => {
  const { inCompletedTasks } = useGlobalState();
  return <Tasks title="InCompleted Tasks" tasks={inCompletedTasks} />;
};

export default page;
