import { EllipsisOutlined } from "@ant-design/icons";
import { Card, Dropdown } from "antd";
import { useDispatch } from "react-redux";
import { deleteTimelineObject } from "../../store/slices/application";
import { useParams } from "react-router-dom";
import Designer from "../designer/Designer";
import { useState } from "react";
import Title from "./Title";
import deleteObjectAction from "../../store/slices/actionSubslices/deleteObjectAction";

const DrawingCard = ({ attachment, id }) => {
  const { id: applicationId } = useParams();
  const [viewOnlyMode, setViewOnlyMode] = useState(true);
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
        <Designer
          initialElements={
            attachment?.data?.drawing && JSON.parse(attachment.data.drawing)
          }
          viewOnlyMode={viewOnlyMode}
        />
      </Card>
    </div>
  );
};

export default DrawingCard;
