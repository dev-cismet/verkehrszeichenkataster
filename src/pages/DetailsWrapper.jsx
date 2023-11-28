import { Outlet } from "react-router-dom";
import Sidebar from "../components/commons/Sidebar";

const DetailsWrapper = () => {
  return (
    <div className="h-full max-h-[calc(100vh-73px)] flex w-full bg-zinc-200">
      <Sidebar />
      <div className="h-full w-full p-2 flex flex-col gap-2 items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default DetailsWrapper;
