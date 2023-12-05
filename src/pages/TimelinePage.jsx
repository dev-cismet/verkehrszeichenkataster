import { Button, Card } from "antd";
import Timeline from "../components/application/Timeline";
import Request from "../components/timeline/Request";
import { useEffect, useState } from "react";
import Text from "../components/timeline/Text";
import Decision from "../components/timeline/Decision";

const TimelinePage = () => {
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
        <div className="flex flex-col w-3/4">
          {timeline.map((attachment, i) => {
            switch (attachment.type) {
              case "antrag":
                return <Request key={i} />;
              case "text":
                return (
                  <Text
                    value={attachment.values?.text}
                    id={i.toString()}
                    key={i}
                  />
                );
              case "entscheidung":
                return <Decision id={i.toString()} />;
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
