import { useFetch } from "../hooks";
import EmptyCard from "./EmptyCard";

export default function FetchComponent() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  if (loading) {
    return <p className="text-purple-600 text-2xl m-5">Loading...</p>;
  }
  if (error) {
    return (
      <div className="flex flex-col gap-y-5 w-[400px] max-w-screen mx-auto mt-5 overflow-hidden">
        <p className="text-red-600 font-semibold text-2xl mb-4">Error</p>
        <div className="p-3 rounded-lg bg-slate-200 h-[150px] w-full flex items-center justify-center">
          <p className="font-medium text-xl text-slate-500">
            An error occured:{" "}
            <span className="text-red-600">{error?.message}</span>
          </p>
        </div>
      </div>
    );
  }

  let displayedData = data;
  if (data?.length > 10) {
    displayedData = data?.slice(0, 10);
  }
  return (
    <div className="min-h-screen w-full md:max-w-screen-md mx-auto relative border rounded-lg">
      <div className="p-4">
        <h3 className="text-xl font-semibold text-purple-600 mb-6">
          {displayedData?.length} Posts
        </h3>
        <div className="flex flex-col gap-y-5">
          {displayedData?.length > 0 ? (
            displayedData?.map((item) => (
              <div
                className="flex flex-col p-3 rounded-lg bg-slate-200"
                key={item.id}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-800">
                    {item?.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 mb-2">{item?.body}</p>
              </div>
            ))
          ) : (
            <EmptyCard message="No post to display" />
          )}
        </div>
      </div>
    </div>
  );
}
