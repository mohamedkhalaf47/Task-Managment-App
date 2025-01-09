"use client"
import React , {createContext, useState, useContext, useEffect} from "react"
import themes from "./themes"
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const { user } = useUser();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const theme = themes[selectedTheme];

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const collapsedMenu = () => {
    setCollapsed(!collapsed);
  }

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("api/tasks");
      const sorted = res.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong...")
    }
  }

  const deleteTask = async(id)=>{
    try {
      const res = await axios.delete(`api/tasks/${id}`)
      toast.success("Task Deleted")
      allTasks();
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong")
    }
  }

  const updateTask = async(task)=>{
    try {
      const res = await axios.put(`api/tasks`,task);
      toast.success("Task Updated Successfully");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  }

  const completedTasks = tasks.filter(task => task.isCompleted === true)
  const inCompletedTasks = tasks.filter(task => task.isCompleted === false)
  const importantTasks = tasks.filter(task => task.isImportant === true)

  useEffect(()=>{
    if(user)allTasks();
  },[user])

  return(
    <GlobalContext.Provider value={{
      theme, 
      tasks, 
      isLoading,
      deleteTask,
      completedTasks,
      inCompletedTasks,
      importantTasks,
      updateTask,
      modal,
      openModal,
      closeModal,
      allTasks,
      collapsed,
      collapsedMenu
      }}>
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalContext)
export const useGlobalUpdate = () => useContext(GlobalUpdateContext)