import { Button, Card, Upload } from "antd";
import Timeline from "../components/application/Timeline";
import Request from "../components/timeline/Request";
import Text from "../components/timeline/Text";
import Decision from "../components/timeline/Decision";

import "./dragger.css";
import { useDispatch, useSelector } from "react-redux";
import { getTimeline, storeTimeline } from "../store/slices/application";
import File from "../components/timeline/File";

const { Dragger } = Upload;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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

  const handleDrop = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file);
    }

    changeTimeline({
      type: "file",
      values: {
        name: file.name.replace(/\.[^/.]+$/, ""),
        url: file.url || file.preview,
      },
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
            {currentTimeline.map((attachment, i) => {
              switch (attachment.type) {
                case "antrag":
                  return <Request key={i} />;
                case "text":
                  return <Text attachment={attachment} id={i} key={i} />;
                case "entscheidung":
                  return <Decision key={i} id={i.toString()} />;
                case "file":
                  return <File key={i} attachment={attachment} i={i} />;
              }
            })}
            <div className="w-full flex justify-center items-center gap-2 pt-2">
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
          <div className="w-80">
            <Timeline dataIn={currentTimeline} />
          </div>
        </div>
      </Dragger>
    </Card>
  );
};

export default TimelinePage;
