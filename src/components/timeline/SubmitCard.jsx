import { Button, Card, Input, Upload } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentApplication,
  updateTimelineStatus,
} from "../../store/slices/application";
import { useParams } from "react-router-dom";
import {
  CloseOutlined,
  FileAddOutlined,
  FileTextOutlined,
  HighlightOutlined,
  HistoryOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Designer from "../designer/Designer";

const SubmitCard = ({ changeTimeline, handleDrop }) => {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [drawElements, setDrawElements] = useState([]);
  const [useDrawing, setUseDrawing] = useState(false);
  const submitRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const anordnung = useSelector(getCurrentApplication);

  const tabListNoTitle = [
    {
      key: "write",
      label: "Schreiben",
    },
    {
      key: "preview",
      label: "Vorschau",
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full py-4">
      <span className="text-start text-lg font-medium">Anhang Hinzufügen</span>
      <Card tabList={tabListNoTitle} size="small" type="inner">
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {useDrawing ? (
            <Designer
              getElements={(elements) => setDrawElements(elements)}
              initialElements={drawElements}
            />
          ) : (
            <Input.TextArea
              placeholder="Kommentar"
              rows={5}
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          )}
          <div className="flex items-center gap-4">
            <Upload
              beforeUpload={(file) => {
                handleDrop(file);
              }}
              fileList={[]}
            >
              <Button className="w-fit" icon={<FileAddOutlined />}>
                Datei
              </Button>
            </Upload>
            {!useDrawing && (
              <Button
                className="w-fit"
                icon={<HighlightOutlined />}
                onClick={() => {
                  setUseDrawing(true);
                  if (submitRef.current) {
                    setTimeout(() => {
                      submitRef.current.scrollIntoView({ behavior: "smooth" });
                    }, 5);
                  }
                }}
              >
                Zeichnung
              </Button>
            )}
          </div>
        </div>
      </Card>
      <div className="w-full flex items-center gap-2 justify-end">
        {useDrawing && (
          <Button
            onClick={() => {
              setUseDrawing(false);
            }}
            icon={<CloseOutlined />}
          >
            Abbrechen
          </Button>
        )}
        {anordnung.timelineStatus === "Offen" && (
          <Button
            type="primary"
            onClick={() => {
              if (useDrawing) {
                changeTimeline({
                  typ: "drawing",
                  name: name,
                  elements: drawElements,
                });
              } else {
                changeTimeline({ typ: "text", name: name, text: text });
              }
              setText("");
              setName("");
              setDrawElements([]);
              setUseDrawing(false);
            }}
            disabled={(!text && !(drawElements.length >= 0)) || !name}
            icon={<PlusOutlined />}
            ref={submitRef}
          >
            Hinzufügen
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubmitCard;
