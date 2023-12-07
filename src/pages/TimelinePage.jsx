import { Button, Card, Upload } from "antd";
import Timeline from "../components/application/Timeline";
import Request from "../components/timeline/Request";
import { useEffect } from "react";
import Text from "../components/timeline/Text";
import Decision from "../components/timeline/Decision";

import "./dragger.css";
import { useDispatch, useSelector } from "react-redux";
import { getTimeline, storeTimeline } from "../store/slices/application";

const { Dragger } = Upload;

const TimelinePage = () => {
  const currentTimeline = useSelector(getTimeline);
  const dispatch = useDispatch();

  const changeTimeline = (item) => {
    dispatch(storeTimeline([...currentTimeline, item]));
    setTimeout(() => {
      document
        .getElementById(currentTimeline.length.toString())
        ?.scrollIntoView({ behavior: "smooth" });
    }, 5);
  };

  return (
    <Card
      bodyStyle={{
        overflowY: "auto",
        overflowX: "clip",
        maxHeight: "94%",
        height: "100%",
      }}
      className="h-full w-full"
      title={<span className="text-2xl">Verlauf</span>}
    >
      <Dragger
        openFileDialogOnClick={false}
        className="h-full w-full"
        beforeUpload={(file) => {
          changeTimeline({
            type: "file",
            values: {
              name: file.name,
            },
          });
        }}
        fileList={[]}
      >
        <div className="h-full w-full flex justify-between">
          <div className="flex flex-col w-3/4">
            {currentTimeline.map((attachment, i) => {
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
                  return <Decision key={i} id={i.toString()} />;
                case "file":
                  return <span key={i}>{attachment.values?.name}</span>;
              }
            })}
            <div className="w-full flex gap-2">
              <Button
                onClick={() => {
                  changeTimeline({
                    type: "text",
                    values: {
                      name: "Bemerkung",
                    },
                  });
                }}
              >
                Bemerkung
              </Button>
              <Button>Zeichnung</Button>
              <Button
                onClick={() => {
                  changeTimeline({
                    type: "entscheidung",
                    values: {
                      name: "Entscheidung",
                    },
                  });
                }}
              >
                Entscheidung
              </Button>
            </div>
          </div>
          <div className="w-80">
            <Timeline dataIn={currentTimeline} />
          </div>
        </div>
      </Dragger>
    </Card>
  );
};

export default TimelinePage;
