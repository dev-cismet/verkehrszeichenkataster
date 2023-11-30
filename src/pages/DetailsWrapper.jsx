import { Outlet, useParams } from "react-router-dom";
import Sidebar from "../components/commons/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedApplications } from "../store/slices/navigation";
import { storeSelectedApplication } from "../store/slices/application";

const DetailsWrapper = () => {
  const { id } = useParams();
  const selectedApplications = useSelector(getSelectedApplications);
  const dispatch = useDispatch();

  const selectedApplication = selectedApplications.find(
    (element) => element.id.toString() === id
  );

  dispatch(storeSelectedApplication(selectedApplication));

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
