import { useReducer, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Task from "./Task";
import PlusIcon from "./vectors/PlusIcon";
import TaskForm from "./TaskForm";
import EmptyCard from "./EmptyCard";

export default function TaskList() {
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentID, setCurrentID] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const initialState = [{}];

  function reducer(state, action) {
    switch (action.type) {
      case "ADD":
        return [...state, action.payload.data];
      case "DELETE":
        return state.filter((task) => task.id !== action.payload.id);
      case "UPDATE":
        return state.map((task) => {
          if (task.id === action.payload.id) {
            return { ...task, ...action.payload.data };
          } else {
            return task;
          }
        });
      case "MARKASCOMPLETED":
        return state.map((task) => {
          if (task.id === action.payload.id) {
            return { ...task, isCompleted: true };
          } else {
            return task;
          }
        });
      default:
        return state;
    }
  }

  function getInitialState() {
    const allSavedTasks = localStorage.getItem("tasks");
    return allSavedTasks ? JSON.parse(allSavedTasks) : initialState;
  }

  const [state, dispatch] = useReducer(reducer, {}, getInitialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
  }, [state]);

  function addNewTask(data) {
    dispatch({ type: "ADD", payload: { data } });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!isEditing) {
      addNewTask({ id: nanoid(), title, desc, isCompleted: false });
    } else {
      updateTask(currentID, { title, desc });
      setCurrentID("");
      setIsEditing(false);
    }
    setTitle("");
    setDesc("");
    setOpenModal(false);
  }

  function markIsCompleted(id) {
    dispatch({ type: "MARKASCOMPLETED", payload: { id } });
  }

  function deleteTask(id) {
    dispatch({ type: "DELETE", payload: { id } });
  }

  function updateTask(id, data) {
    dispatch({ type: "UPDATE", payload: { id, data } });
  }

  const activeTasks = state.filter((task) => task.isCompleted === false);
  const completedTasks = state.filter((task) => task.isCompleted === true);
  return (
    <div className="relative p-4">
      <h2 className="text-2xl font-semibold text-slate-900 mb-8">TuuDuu</h2>
      <div className="flex flex-col gap-y-5 divide-y">
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-6">
            Active Tasks
          </h3>
          <div className="flex flex-col gap-y-5">
            {activeTasks.length > 0 ? (
              activeTasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  markAsCompleted={() => markIsCompleted(task.id)}
                  handleDelete={() => deleteTask(task.id)}
                  handleEdit={() => {
                    setIsEditing(() => {
                      setCurrentID(task.id);
                      setOpenModal(true);
                      setTitle(task.title);
                      setDesc(task.desc);
                      return true;
                    });
                  }}
                />
              ))
            ) : (
              <EmptyCard />
            )}
          </div>
        </div>
        <div className="pt-5">
          <h3 className="text-xl font-semibold text-green-600 mb-6">
            Completed Tasks
          </h3>
          <div className="flex flex-col gap-y-5">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  markAsCompleted={() => markIsCompleted(task.id)}
                  handleDelete={() => deleteTask(task.id)}
                  handleEdit={() => {
                    setIsEditing(() => {
                      setCurrentID(task.id);
                      setOpenModal(true);
                      setTitle(task.title);
                      setDesc(task.desc);
                      return true;
                    });
                  }}
                />
              ))
            ) : (
              <EmptyCard message="All tasks are still active" />
            )}
          </div>
        </div>
        <button
          className="border-none p-4 fixed bottom-6 rounded-full bg-slate-500 w-fit self-end"
          onClick={() => setOpenModal(true)}
        >
          <PlusIcon />
        </button>
      </div>
      <TaskForm
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        handleSubmit={onSubmit}
        desc={desc}
        title={title}
        handleDescChange={(e) => setDesc(e.target.value)}
        handleTitleChange={(e) => setTitle(e.target.value)}
        isEditing={isEditing}
      />
    </div>
  );
}
