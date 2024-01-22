import { Button, Card, Input, Upload } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
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
import MdRedactor from "../mdredactor/MdRedactor";
import { titleCase } from "../../tools/helper";
import addAnordnungAction from "../../store/slices/actionSubslices/addAnordnungAction";

const SubmitCard = ({ changeTimeline, handleDrop }) => {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [drawElements, setDrawElements] = useState([]);
  const [drawFiles, setDrawFiles] = useState([]);
  const [useDrawing, setUseDrawing] = useState(false);
  const [triggerDrawingGeneration, setTriggerDrawingGeneration] = useState(0);
  const [drawing, setDrawing] = useState("");
  const submitRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const anordnung = useSelector(getCurrentApplication);

  const status = titleCase(anordnung?.vzk_status?.name);

  return (
    <>
      {status === "Offen" && (
        <div className="flex flex-col gap-2 w-full py-4">
          <span className="text-start text-lg font-medium">
            Anhang Hinzufügen
          </span>
          <Card size="small" type="inner">
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              {useDrawing ? (
                <Designer
                  getElements={(elements) => setDrawElements(elements)}
                  getFiles={(files) => setDrawFiles(files)}
                  initialElements={drawElements}
                  resetDrawing={triggerDrawingGeneration}
                  getPreviewSrcLink={(preview) => setDrawing(preview)}
                />
              ) : (
                <MdRedactor getDocument={(text) => setText(text)} />
              )}
              <div className="flex items-center gap-4">
                {!useDrawing && (
                  <>
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
                    <Button
                      className="w-fit"
                      icon={<HighlightOutlined />}
                      onClick={() => {
                        setUseDrawing(true);
                        if (submitRef.current) {
                          setTimeout(() => {
                            submitRef.current.scrollIntoView({
                              behavior: "smooth",
                            });
                          }, 5);
                        }
                      }}
                    >
                      Zeichnung
                    </Button>
                  </>
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
            {status === "Offen" && (
              <Button
                type="primary"
                onClick={() => {
                  setTriggerDrawingGeneration((prevValue) => {
                    return prevValue + 1;
                  });
                  const uuid = uuidv4();
                  const timelineObjectId = uuidv4();

                  if (useDrawing) {
                    changeTimeline({
                      typ: "drawing",
                      name: name,
                      elements: {
                        elements: drawElements,
                        files: drawFiles,
                      },
                    });
                  } else {
                    dispatch(
                      addAnordnungAction({
                        className: "vzk_attachment_text",
                        data: {
                          text: text,
                          uuid: uuid,
                        },
                      })
                    );
                    dispatch(
                      addAnordnungAction({
                        className: "vzk_anordnung",
                        data: {
                          uuid: id,
                          vzk_anordnung_timelineArrayRelationShip: [
                            ...anordnung.vzk_anordnung_timelineArrayRelationShip,
                            {
                              name: name,
                              fk_uuid: uuid,
                              uuid: timelineObjectId,
                              vzk_attachment_typ: {
                                id: 2,
                                name: "Text",
                              },
                            },
                          ],
                        },
                      })
                    );
                    changeTimeline({ typ: "text", name: name, text: text });
                  }
                  setText("");
                  setName("");
                  setDrawElements([]);
                  setUseDrawing(false);
                }}
                disabled={!text && !(drawElements.length >= 0)}
                icon={<PlusOutlined />}
                ref={submitRef}
              >
                Hinzufügen
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SubmitCard;
