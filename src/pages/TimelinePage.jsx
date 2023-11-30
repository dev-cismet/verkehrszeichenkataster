import Timeline from "../components/application/Timeline";
import { getSelectedApplication } from "../store/slices/application";
import { useSelector } from "react-redux";

const TimelinePage = () => {
  const selectedApplication = useSelector(getSelectedApplication);

  return (
    <div className="flex w-full h-full justify-center items-center">
      <Timeline dataIn={selectedApplication} />
    </div>
  );
};

export default TimelinePage;
