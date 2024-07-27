// import FetchComponent from "./components/FetchComponent";
import TaskList from "./components/TaskList";

//un-comment the FetchComponent and replace TaskList with it to see the useFetch hook in action.

export default function App() {
  return (
    <main className="min-h-screen w-full md:max-w-screen-md mx-auto relative">
      <TaskList />
    </main>
  );
}
