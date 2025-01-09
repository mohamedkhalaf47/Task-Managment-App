"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Button from '../Button/Button';
import { plus } from '@/app/utils/icons';
import { useGlobalState } from '@/app/Context/GlobalContextProvider';

const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);

  const { allTasks,closeModal } = useGlobalState();

  const handleChange = (name:String) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(!completed);
        break;
      case "important":
        setImportant(!important);
        break;
      default:
        break;
    }
  }

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    const task = {
      title,
      description,
      date,
      completed,
      important,
    };
    try {
      const res = await axios.post("api/tasks", task);
      if(res.data.error){
        toast.error(res.data.error);
      } else{
        toast.success("Task Created");
        allTasks();
        closeModal();
      }
    } catch (error:any) {
      toast.error("Something Went Wrong.")
      console.error({message: error.message, status: error.status});
    }
  }

  return (
    <form onSubmit={handleSubmit} className="text-[#dbe1e8] ">
      <h1 className="text-2xl font-semibold">Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder="e.g, Pray Fajr, Watch a Podcast, etc..."
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          name="description"
          rows={4}
          onChange={handleChange("description")}
          placeholder="Describe Your Task In Details"
        />
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          name="date"
          onChange={handleChange("date")}
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="completed">Completed</label>
        <input
          type="checkbox"
          id="completed"
          value={completed.toString()}
          name="completed"
          onChange={handleChange("completed")}
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="important">Important</label>
        <input
          type="checkbox"
          id="important"
          value={important.toString()}
          name="important"
          onChange={handleChange("important")}
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          name="Create a Task"
          icon={plus}
          padding="0.8rem 2rem"
          borderRad="0.8rem"
          fw="500"
          fs="1.2rem"
          color="#dbe1e8"
          background="rgb(0, 163, 200)"
        />
      </div>
    </form>
  );
}

export default CreateContent