import { Button, Card } from "antd";
import Timeline from "../components/application/Timeline";
import { getSelectedApplication } from "../store/slices/application";
import { useSelector } from "react-redux";
import Request from "../components/timeline/Request";
import Toolbar from "../components/timeline/Toolbar";
import { useState } from "react";
import Text from "../components/timeline/Text";

const TimelinePage = () => {
  const selectedApplication = useSelector(getSelectedApplication);
  const [timeline, setTimeline] = useState([
    {
      type: "antrag",
      values: {
        ort: "Barmen",
      },
    },
  ]);

  return (
    <Card
      bodyStyle={{
        overflowY: "auto",
        overflowX: "clip",
        maxHeight: "94%",
      }}
      className="h-full w-full"
      title="Verlauf"
    >
      <div className="h-full w-full flex justify-between">
        <div className="flex flex-col w-3/4 gap-2">
          {timeline.map((attachment) => {
            switch (attachment.type) {
              case "antrag":
                return <Request />;
              case "text":
                return <Text value={attachment.values?.text} />;
              default:
                return <></>;
            }
          })}
          <div className="w-full flex gap-2">
            <Button
              onClick={() =>
                setTimeline((currentTimeline) => [
                  ...currentTimeline,
                  { type: "text" },
                ])
              }
            >
              Text
            </Button>
            <Button>Zeichnung</Button>
            <Button>Entscheidung</Button>
          </div>
        </div>
        <div className="w-80">
          <Timeline dataIn={selectedApplication} />
        </div>
      </div>
    </Card>
  );
};

export default TimelinePage;
