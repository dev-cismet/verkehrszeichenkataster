import { Button, Card, Select } from "antd";
import Timeline from "../components/application/Timeline";
import { getSelectedApplication } from "../store/slices/application";
import { useSelector } from "react-redux";
import Request from "../components/timeline/Request";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setTimeout(() => {
      document
        .getElementById(timeline.length.toString() - 1)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 5);
  }, [timeline]);

  return (
    <Card
      bodyStyle={{
        overflowY: "auto",
        overflowX: "clip",
        maxHeight: "94%",
      }}
      className="h-full w-full"
      title={<span className="text-2xl">Verlauf</span>}
    >
      <div className="h-full w-full flex justify-between">
        <div className="flex flex-col w-3/4 gap-2">
          {timeline.map((attachment, i) => {
            switch (attachment.type) {
              case "antrag":
                return <Request />;
              case "text":
                return (
                  <Text value={attachment.values?.text} id={i.toString()} />
                );
              case "entscheidung":
                return (
                  <Select
                    className="w-1/2"
                    defaultValue={"Abgeschlossen"}
                    id={i.toString()}
                  />
                );
              default:
                return <></>;
            }
          })}
          <div className="w-full flex gap-2">
            <Button
              onClick={() => {
                setTimeline((currentTimeline) => [
                  ...currentTimeline,
                  { type: "text" },
                ]);
              }}
            >
              Text
            </Button>
            <Button>Zeichnung</Button>
            <Button
              onClick={() =>
                setTimeline((currentTimeline) => [
                  ...currentTimeline,
                  { type: "entscheidung" },
                ])
              }
            >
              Entscheidung
            </Button>
          </div>
        </div>
        <div className="w-80">
          <Timeline dataIn={timeline} />
        </div>
      </div>
    </Card>
  );
};

export default TimelinePage;
