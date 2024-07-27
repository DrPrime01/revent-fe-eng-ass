/* eslint-disable react/prop-types */
export default function TaskForm({
  openModal,
  closeModal,
  handleSubmit,
  isEditing,
  handleTitleChange,
  handleDescChange,
  title,
  desc,
}) {
  return (
    <div
      className={`fixed inset-0 bg-black/50 z-[999] backdrop:blur-[5px] ${
        openModal ? "flex" : "hidden"
      } items-center justify-center`}
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className="relative max-h-[85vh] overflow-y-auto flex flex-col max-w-[700px] mx-auto w-[95vw] bg-slate-200 rounded-xl p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-sm text-slate-500" htmlFor="title">
              Title
            </label>
            <input
              className="py-1.5 px-3 text-sm rounded-lg border-slate-500 w-full"
              name="title"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-sm text-slate-500" htmlFor="details">
              Details
            </label>
            <textarea
              className="py-1.5 px-3 text-sm rounded-lg border-gray-500 w-full"
              name="details"
              id="details"
              value={desc}
              onChange={handleDescChange}
            />
          </div>
          <button
            disabled={!title}
            className="py-1.5 px-3 w-full text-slate-500 bg-black disabled:opacity-50 rounded-xl"
          >
            {isEditing ? "Update task" : "Add task"}
          </button>
        </form>
      </div>
    </div>
  );
}
