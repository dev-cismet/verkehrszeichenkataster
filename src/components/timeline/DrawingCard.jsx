import { EllipsisOutlined } from "@ant-design/icons";
import { Card, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTimelineObject,
  getCurrentApplication,
  storeCurrentApplication,
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

const DrawingCard = ({ attachment, id, changeTimeline }) => {
  const { id: applicationId } = useParams();
  const [viewOnlyMode, setViewOnlyMode] = useState(true);
  const [drawElements, setDrawElements] = useState([]);
  const [drawFiles, setDrawFiles] = useState([]);
  const [drawing, setDrawing] = useState("");
  const [resetDrawing, setResetDrawing] = useState(false);
  const anordnung = useSelector(getCurrentApplication);
  const dispatch = useDispatch();
  const drawingId = attachment?.data?.id;

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
                timelineIndex: id,
              })
            );
          }}
        >
          Entfernen
        </div>
      ),
      key: "1",
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

  dispatch(storeSignsLibMode("overlay"));

  return (
    <div className="w-full relative py-4 before:bg-zinc-200 before:absolute before:bottom-0 before:content-[''] before:block before:left-4 before:top-0 before:w-[2px]">
      <Card
        size="small"
        type="inner"
        title={
          <div className="w-full flex">
            <Title attachment={attachment} index={id} />
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
        {attachment?.data?.drawing && (
          <Designer
            key={resetDrawing}
            getElements={(elements) => setDrawElements(elements)}
            getFiles={(files) => setDrawFiles(files)}
            initialElements={JSON.parse(attachment.data.drawing)}
            viewOnlyMode={viewOnlyMode}
            getPreviewSrcLink={(preview) => setDrawing(preview)}
            setViewOnlyMode={setViewOnlyMode}
            drawingId={drawingId}
          />
        )}
      </Card>
    </div>
  );
};

export default DrawingCard;
