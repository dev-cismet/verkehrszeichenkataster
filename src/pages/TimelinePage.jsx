import { Button, Card, Input, Upload } from "antd";
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

const getBase64 = (file) => {
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const tabListNoTitle = [
  {
    key: "write",
    label: "write",
  },
  {
    key: "preview",
    label: "preview",
  },
];

const TimelinePage = () => {
  const { id } = useParams();
  const currentTimeline = useSelector(getCurrentApplication).timeline;
  const isInternalRequest =
    useSelector(getCurrentApplication).typ === "internal";

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
      title={
        <div className="w-3/4 mx-auto flex items-center gap-2">
          <div className="bg-green-400 py-0.5 px-2 rounded-xl flex items-center justify-center">
            Offen
          </div>
          <h1 className="mb-0">Verlauf</h1>
          <span className="text-zinc-400 text-2xl">#1234</span>
        </div>
      }
    >
      <Dragger
        openFileDialogOnClick={false}
        className="h-full w-full"
        beforeUpload={(file) => {
          handleDrop(file);
        }}
        fileList={[]}
      >
        <div className="h-full w-3/4 mx-auto flex justify-between">
          <div className="flex flex-col w-3/4 gap-4">
            {currentTimeline?.map((attachment, i) => {
              switch (attachment.typ) {
                case "request":
                  return (
                    <Request
                      attachment={attachment}
                      key={i}
                      i={i}
                      isInternalRequest={isInternalRequest}
                    />
                  );
                case "text":
                  return <Text attachment={attachment} id={i} key={i} />;
                case "decision":
                  return <Decision key={i} id={i} attachment={attachment} />;
                case "file":
                  return <File key={i} attachment={attachment} i={i} />;
              }
            })}
            <hr className="w-full bg-black" />
            <div className="flex flex-col gap-2 w-full">
              <span className="text-start text-lg font-medium">
                Kommentar Hinzufügen
              </span>
              <Card tabList={tabListNoTitle}>
                <div className="flex flex-col gap-2">
                  <Input.TextArea placeholder="Kommentar hinzufügen" rows={5} />
                  <Button
                    className="w-fit"
                    onClick={() => {
                      changeTimeline({
                        typ: "text",
                        name: "Widerrufsvorbehalt",
                        text: "Diese Genehmigung kann widerrufen werden; insbesondere wenn der zur Erteilung führende Grund wegfällt oder der Widerruf aus sonstigenb Gründen geboten ist, z.B. weil sich die zugrundeliegende Sach- oder Rechtslage ändert.",
                      });
                    }}
                  >
                    Widerrufsvorbehalt
                  </Button>
                </div>
              </Card>
              <div className="w-full flex items-center gap-2 justify-end">
                <Button>Close</Button>
                <Button type="primary" disabled>
                  Comment
                </Button>
              </div>
            </div>

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
            <div className="w-2/3 flex justify-center items-center gap-2 pt-2">
              <div className="w-[20%]" />
              <Button
                onClick={() => {
                  changeTimeline({
                    typ: "text",
                    name: "Ort",
                    text: "",
                  });
                }}
              >
                Ort
              </Button>
              <Button
                onClick={() => {
                  changeTimeline({
                    typ: "text",
                    name: "Sachverhalt",
                    text: "",
                  });
                }}
              >
                Sachverhalt
              </Button>
              <Button
                onClick={() => {
                  changeTimeline({
                    typ: "text",
                    name: "Erforderliche Maßnahmen",
                    text: "",
                  });
                }}
              >
                Erforderliche Maßnahmen
              </Button>
              <Button
                onClick={() => {
                  changeTimeline({
                    typ: "text",
                    name: "Ort",
                    text: "",
                  });
                  changeTimeline({
                    typ: "text",
                    name: "Sachverhalt",
                    text: "",
                  });
                  changeTimeline({
                    typ: "text",
                    name: "Erforderliche Maßnahmen",
                    text: "",
                  });
                }}
              >
                OSEM
              </Button>
              <Button
                onClick={() => {
                  changeTimeline({
                    typ: "text",
                    name: "Widerrufsvorbehalt",
                    text: "Diese Genehmigung kann widerrufen werden; insbesondere wenn der zur Erteilung führende Grund wegfällt oder der Widerruf aus sonstigenb Gründen geboten ist, z.B. weil sich die zugrundeliegende Sach- oder Rechtslage ändert.",
                  });
                }}
              >
                Widerrufsvorbehalt
              </Button>
              <Button
                onClick={() => {
                  changeTimeline({
                    typ: "text",
                    name: "Mit freundlichen Grüßen",
                  });
                }}
              >
                MfG
              </Button>
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
