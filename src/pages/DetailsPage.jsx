import React from "react";
import Sidebar from "../components/commons/Sidebar";

const DetailsPage = () => {
  return (
    <div className="h-full max-h-[calc(100vh-73px)] flex w-full bg-zinc-200">
      <Sidebar />
      <div className="h-full w-full p-2">DetailsPage</div>
    </div>
  );
};

export default DetailsPage;
