import { Card } from "antd";
import Timeline from "../components/application/Timeline";
import { getSelectedApplication } from "../store/slices/application";
import { useSelector } from "react-redux";
import Request from "../components/timeline/Request";
import Toolbar from "../components/timeline/Toolbar";

const TimelinePage = () => {
  const selectedApplication = useSelector(getSelectedApplication);

  return (
    <Card className="h-full w-full" title="Verlauf">
      <div className="h-full w-full flex justify-between">
        <div className="flex flex-col w-3/4">
          <Request />
          <Toolbar />
        </div>
        <div className="w-80">
          <Timeline dataIn={selectedApplication} />
        </div>
      </div>
    </Card>
  );
};

export default TimelinePage;
