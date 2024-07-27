import DoubleCheckIcon from "./vectors/DoubleCheckIcon";
import EditIcon from "./vectors/EditIcon";
import TrashIcon from "./vectors/TrashIcon";

/* eslint-disable react/prop-types */
export default function Task({
  task,
  markAsCompleted,
  handleDelete,
  handleEdit,
}) {
  const { title, desc, isCompleted } = task;
  return (
    <div className="flex flex-col p-3 rounded-lg bg-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`text-xl font-semibold text-slate-800 ${
            isCompleted ? "line-through" : ""
          }`}
        >
          {title}
        </h3>
        <button
          disabled={isCompleted}
          className="border-none p-2 rounded-full hover:bg-slate-300 transition-all"
          onClick={markAsCompleted}
        >
          <DoubleCheckIcon />
        </button>
      </div>
      <p
        className={`text-sm text-slate-500 mb-2 ${
          isCompleted ? "line-through" : ""
        }`}
      >
        {desc || "No description about the task."}
      </p>
      <div className="self-end flex items-center gap-x-3">
        <button
          disabled={isCompleted}
          className="border-none p-2 rounded-full hover:bg-slate-300 transition-all"
          onClick={handleEdit}
        >
          <EditIcon />
        </button>
        <button
          className="border-none p-2 rounded-full hover:bg-slate-300 transition-all"
          onClick={handleDelete}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}
