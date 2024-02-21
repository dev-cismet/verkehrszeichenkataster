import { Outlet, useParams } from "react-router-dom";
import Sidebar from "../components/commons/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplicationById,
  getCurrentApplication,
} from "../store/slices/application";
import { useEffect } from "react";
import { Font } from "@react-pdf/renderer";

const DetailsWrapper = () => {
  const { id } = useParams();
  const currentApplication = useSelector(getCurrentApplication);
  const dispatch = useDispatch();

  Font.register({
    family: "Open Sans",
    fonts: [
      {
        src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
      },
      {
        src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-300.ttf",
        fontWeight: 300,
      },
      {
        src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
        fontWeight: 600,
      },
      {
        src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf",
        fontWeight: 700,
      },
      {
        src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-800.ttf",
        fontWeight: 800,
      },
      {
        src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf",
        fontStyle: "italic",
      },
    ],
  });

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
