/* eslint-disable react/prop-types */
export default function EmptyCard({ message }) {
  return (
    <div className="p-3 rounded-lg bg-slate-200 h-[150px] w-full flex items-center justify-center">
      <p className="font-medium text-xl text-slate-500">{message || "No task available"}</p>
    </div>
  );
}
