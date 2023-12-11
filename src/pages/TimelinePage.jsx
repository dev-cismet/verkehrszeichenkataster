import { Button, Card, Upload } from "antd";
import Timeline from "../components/application/Timeline";
import Request from "../components/timeline/Request";
import Text from "../components/timeline/Text";
import Decision from "../components/timeline/Decision";

import "./dragger.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentApplication,
  storeTimeline,
} from "../store/slices/application";
import File from "../components/timeline/File";
import { useParams } from "react-router-dom";

const { Dragger } = Upload;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const TimelinePage = () => {
  const { id } = useParams();
  const currentTimeline = useSelector(getCurrentApplication).timeline;

  const dispatch = useDispatch();

  const changeTimeline = (item) => {
    dispatch(storeTimeline({ id: id, timeline: [...currentTimeline, item] }));
    setTimeout(() => {
      document
        .getElementById(currentTimeline.length.toString())
        ?.scrollIntoView({ behavior: "smooth" });
    }, 5);
  };

  const handleDrop = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file);
    }

    changeTimeline({
      typ: "file",
      name: file.name.replace(/\.[^/.]+$/, ""),
      file: file.url || file.preview,
      description: "",
    });
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
          handleDrop(file);
        }}
        fileList={[]}
      >
        <div className="h-full w-full flex justify-between">
          <div className="flex flex-col w-3/4">
            {currentTimeline?.map((attachment, i) => {
              switch (attachment.typ) {
                case "request":
                  return <Request attachment={attachment} key={i} i={i} />;
                case "text":
                  return <Text attachment={attachment} id={i} key={i} />;
                case "decision":
                  return <Decision key={i} id={i} attachment={attachment} />;
                case "file":
                  return <File key={i} attachment={attachment} i={i} />;
              }
            })}
            <div className="w-2/3 flex justify-center items-center gap-2 pt-2">
              <div className="w-[20%]" />
              <Button
                onClick={() => {
                  changeTimeline({
                    typ: "text",
                    name: "Bemerkung",
                    text: "",
                  });
                }}
              >
                Bemerkung
              </Button>
              <Button>Zeichnung</Button>
              <Button
                onClick={() => {
                  changeTimeline({
                    typ: "decision",
                    name: "Entscheidung",
                  });
                }}
              >
                Entscheidung
              </Button>
              <Upload
                beforeUpload={(file) => {
                  handleDrop(file);
                }}
                fileList={[]}
              >
                <Button>Datei</Button>
              </Upload>
            </div>
          </div>
          <div className="w-96">
            <Timeline dataIn={currentTimeline} />
          </div>
        </div>
      </Dragger>
    </Card>
  );
};

export default TimelinePage;
