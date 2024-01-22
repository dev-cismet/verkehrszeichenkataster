import { Outlet, useParams } from "react-router-dom";
import Sidebar from "../components/commons/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplicationById,
  getCurrentApplication,
} from "../store/slices/application";
import { useEffect } from "react";

const DetailsWrapper = () => {
  const { id } = useParams();
  const currentApplication = useSelector(getCurrentApplication);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentApplication.uuid !== id) {
      dispatch(getApplicationById(id));
    }
  }, [id]);

  return (
    <div className="h-full max-h-[calc(100vh-104px)] flex w-full bg-zinc-200 overflow-clip">
      <Sidebar />
      <div className="h-full w-full p-2 flex flex-col gap-2 items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default DetailsWrapper;
