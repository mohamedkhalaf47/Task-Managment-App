"use client"
import React from 'react'
import { useGlobalState } from '../Context/GlobalContextProvider'
import Tasks from '../Components/Tasks/Tasks';

const page = () => {
  const { completedTasks } = useGlobalState();
  return (
    <Tasks title='Completed Tasks' tasks={completedTasks} />
  )
}

export default page