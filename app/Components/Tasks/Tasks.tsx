import React from "react";
import CreateContent from "../Modals/CreateContent";
import { useGlobalState } from "@/app/Context/GlobalContextProvider";
import TaskItem from "../TaskItem/TaskItem";
import { plus } from "@/app/utils/icons";
import Modal from "../Modals/Modal";

interface Props {
  title: string;
  tasks: any[];
}

const Tasks = ({ title, tasks }: Props) => {
  const { isLoading, openModal, modal } = useGlobalState();
  tasks;
  return (
    <div className="w-full h-full bg-[#212121] border-2 border-solid border-[#f9f9f914] rounded-2xl p-8 overflow-y-auto">
      {modal && <Modal content={ <CreateContent /> } />}
      <h1 className="relative font-extrabold text-2xl after:content-none after:absolute after:bottom-[-0.5rem] after:left-0 after:w-12 after:h-[0.2rem] after:bg-[#6FCF97] after:rounded-lg">
        {title}
      </h1>
      {!isLoading ? (
        <div className="theTask grid gap-6 my-16 mx-0">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              title={task.title}
              description={task.description}
              date={task.date}
              isCompleted={task.isCompleted}
              id={task.id}
            />
          ))}
          <button className="flex items-center justify-center gap-2 h-64 text-[##b2becd] font-semibold cursor-pointer border-2 border-dashed border-[#2a2e35] duration-500 hover:bg-[#2a2e35] hover:text-[#f8f8f8]"
          onClick={openModal}>
            {plus}
            Add New Task
          </button>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="tasksLoader"></span>
        </div>
      )}
    </div>
  );
};

export default Tasks;
