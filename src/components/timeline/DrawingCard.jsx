import { EllipsisOutlined } from "@ant-design/icons";
import { Card, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTimelineObject,
  getCurrentApplication,
} from "../../store/slices/application";
import { useParams } from "react-router-dom";
import Designer from "../designer/Designer";
import { useState } from "react";
import Title from "./Title";
import deleteObjectAction from "../../store/slices/actionSubslices/deleteObjectAction";
import addAnordnungAction from "../../store/slices/actionSubslices/addAnordnungAction";

const DrawingCard = ({ attachment, id, changeTimeline }) => {
  const { id: applicationId } = useParams();
  const [viewOnlyMode, setViewOnlyMode] = useState(true);
  const [drawElements, setDrawElements] = useState([]);
  const [drawFiles, setDrawFiles] = useState([]);
  const [drawing, setDrawing] = useState("");
  const anordnung = useSelector(getCurrentApplication);
  const dispatch = useDispatch();

  const items = [
    {
      label: (
        <div
          onClick={() => {
            setViewOnlyMode(false);
          }}
        >
          Bearbeiten
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
            dispatch(
              addAnordnungAction({
                className: "vzk_anordnung",
                data: {
                  uuid: attachment?.uuid,
                  vzk_anordnung_timelineArrayRelationShip: [
                    ...anordnung.vzk_anordnung_timelineArrayRelationShip,
                    {
                      name: "",
                      fk_uuid: attachment?.fk_uuid,
                      uuid: attachment?.uuid,
                      vzk_attachment_typ: {
                        id: 5,
                        name: "Drawing",
                      },
                    },
                  ],
                },
              })
            );
            changeTimeline({
              typ: "drawing",
              name: "",
              fk_uuid: attachment?.fk_uuid,
              uuid: attachment?.uuid,
              vzk_attachment_typ: {
                id: 5,
                name: "Drawing",
              },
              data: {
                drawing: JSON.stringify({
                  elements: drawElements,
                  files: drawFiles,
                  base64Preview: drawing,
                }),
              },
            });

            dispatch(
              deleteTimelineObject({
                timelineIndex: id,
              })
            );
          }}
        >
          Speichern
        </div>
      ),
      key: "3",
    });
  }

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
            key={viewOnlyMode}
            getElements={(elements) => setDrawElements(elements)}
            getFiles={(files) => setDrawFiles(files)}
            initialElements={JSON.parse(attachment.data.drawing)}
            viewOnlyMode={viewOnlyMode}
            getPreviewSrcLink={(preview) => setDrawing(preview)}
          />
        )}
      </Card>
    </div>
  );
};

export default DrawingCard;
