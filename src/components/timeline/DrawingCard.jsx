import {
  CloseOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTimelineObject,
  getCurrentApplication,
  storeCurrentApplication,
  updateTimelineValues,
} from "../../store/slices/application";
import {
  storeEditingDrawing,
  storeSignsLibMode,
} from "../../store/slices/signsLibrary";
import { useParams } from "react-router-dom";
import Designer from "../designer/Designer";
import { useState, useEffect } from "react";
import Title from "./Title";
import deleteObjectAction from "../../store/slices/actionSubslices/deleteObjectAction";
import addAnordnungAction from "../../store/slices/actionSubslices/addAnordnungAction";
import MdRedactor, { mdParser } from "../mdredactor/MdRedactor";

const DrawingCard = ({ attachment, index }) => {
  const { id: applicationId } = useParams();
  const [viewOnlyMode, setViewOnlyMode] = useState(true);
  const [drawElements, setDrawElements] = useState([]);
  const [drawFiles, setDrawFiles] = useState([]);
  const [drawing, setDrawing] = useState("");
  const [resetDrawing, setResetDrawing] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [drawingId, setDrawingId] = useState(null);
  const [description, setDescription] = useState("");

  const anordnung = useSelector(getCurrentApplication);
  const dispatch = useDispatch();

  const items = [
    {
      label: (
        <div
          onClick={() => {
            setViewOnlyMode(!viewOnlyMode);
            dispatch(storeEditingDrawing(drawingId));
          }}
        >
          {viewOnlyMode ? (
            "Bearbeiten"
          ) : (
            <span
              onClick={() => {
                setResetDrawing(!resetDrawing);
              }}
            >
              Abbrechen
            </span>
          )}
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div
          onClick={() => {
            setShowEditor(true);
          }}
        >
          Beschreibung{" "}
          {attachment?.data?.description ? "bearbeiten" : "hinzufügen"}
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          onClick={() => {
            dispatch(
              deleteObjectAction({
                className: "vzk_attachment_drawing",
                data: {
                  uuid: attachment?.fk_uuid,
                },
              })
            );
            dispatch(
              deleteObjectAction({
                className: "vzk_anordnung_timeline",
                data: {
                  uuid: attachment?.uuid,
                },
              })
            );
            dispatch(
              deleteTimelineObject({
                timelineIndex: index,
              })
            );
          }}
        >
          Entfernen
        </div>
      ),
      key: "2",
    },
  ];

  if (!viewOnlyMode) {
    items.push({
      label: (
        <div
          onClick={() => {
            setResetDrawing(!resetDrawing);
            dispatch(storeSignsLibMode("none"));
            setViewOnlyMode(true);
            dispatch(
              addAnordnungAction({
                className: "vzk_attachment_drawing",
                data: {
                  drawing: JSON.stringify({
                    elements: drawElements,
                    files: drawFiles,
                    base64Preview: drawing,
                  }),
                  uuid: attachment?.fk_uuid,
                },
              })
            );
            const copyanordnung = {
              ...anordnung,
              vzk_anordnung_timelineArrayRelationShip:
                anordnung.vzk_anordnung_timelineArrayRelationShip.map(
                  (item) => {
                    if (item.fk_uuid === attachment?.fk_uuid) {
                      return {
                        ...item,
                        data: {
                          ...item.data,
                          drawing: JSON.stringify({
                            elements: drawElements,
                            files: drawFiles,
                            base64Preview: drawing,
                          }),
                        },
                      };
                    } else {
                      return item;
                    }
                  }
                ),
            };
            dispatch(storeCurrentApplication(copyanordnung));
          }}
        >
          Speichern
        </div>
      ),
      key: "3",
    });
  }

  useEffect(() => {
    dispatch(storeSignsLibMode("overlay"));
  }, []);

  useEffect(() => {
    if (attachment?.data?.id) {
      setDrawingId(attachment?.data?.id);
    }
  }, [attachment?.data?.id]);

  function handlesaveDrawing() {
    setViewOnlyMode(true);
    dispatch(
      addAnordnungAction({
        className: "vzk_attachment_drawing",
        data: {
          drawing: JSON.stringify({
            elements: drawElements,
            files: drawFiles,
            base64Preview: drawing,
          }),
          uuid: attachment?.fk_uuid,
        },
      })
    );
    const copyanordnung = {
      ...anordnung,
      vzk_anordnung_timelineArrayRelationShip:
        anordnung.vzk_anordnung_timelineArrayRelationShip.map((item) => {
          if (item.fk_uuid === attachment?.fk_uuid) {
            return {
              ...item,
              data: {
                drawing: JSON.stringify({
                  elements: drawElements,
                  files: drawFiles,
                  base64Preview: drawing,
                }),
              },
            };
          } else {
            return item;
          }
        }),
    };
    dispatch(storeCurrentApplication(copyanordnung));
  }

  return (
    <div
      id={index}
      className="w-full relative py-4 before:bg-zinc-200 before:absolute before:bottom-0 before:content-[''] before:block before:left-4 before:top-0 before:w-[2px]"
    >
      <Card
        size="small"
        type="inner"
        title={
          <div className="w-full flex">
            <Title attachment={attachment} index={index} />
            <Dropdown
              trigger={["click"]}
              menu={{ items }}
              placement="bottomRight"
            >
              <div className="p-1 flex items-center justify-center hover:bg-zinc-100 rounded-lg cursor-pointer">
                <EllipsisOutlined className="text-2xl" />
              </div>
            </Dropdown>
          </div>
        }
      >
        {showEditor && (
          <div className="flex flex-col gap-2 mb-2">
            <MdRedactor
              mdDoc={attachment?.data?.description}
              getDocument={(text) => setDescription(text)}
            />
            <div className="w-full flex items-center gap-2 justify-end">
              <Button
                icon={<CloseOutlined />}
                onClick={() => setShowEditor(false)}
              >
                Abbrechen
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  dispatch(
                    addAnordnungAction({
                      className: "vzk_attachment_drawing",
                      data: {
                        description: description,
                        uuid: attachment.fk_uuid,
                      },
                    })
                  );
                  dispatch(
                    updateTimelineValues({
                      timelineIndex: index,
                      itemValue: description,
                      property: "description",
                      applicationId: applicationId,
                    })
                  );
                  setShowEditor(false);
                }}
              >
                Beschreibung{" "}
                {attachment?.data?.description ? "bearbeiten" : "hinzufügen"}
              </Button>
            </div>
          </div>
        )}
        {attachment?.data?.description && (
          <div
            dangerouslySetInnerHTML={{
              __html: mdParser.render(attachment?.data?.description || ""),
            }}
          />
        )}
        {attachment?.data?.drawing && (
          <Designer
            key={resetDrawing}
            getElements={(elements) => setDrawElements(elements)}
            getFiles={(files) => setDrawFiles(files)}
            initialElements={JSON.parse(attachment.data.drawing)}
            viewOnlyMode={viewOnlyMode}
            getPreviewSrcLink={(preview) => setDrawing(preview)}
            saveDrawing={handlesaveDrawing}
            drawingId={drawingId}
          />
        )}
      </Card>
    </div>
  );
};

export default DrawingCard;
