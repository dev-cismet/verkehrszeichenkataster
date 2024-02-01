import { Card, Dropdown, Button } from "antd";
import { useDispatch } from "react-redux";
import {
  deleteTimelineObject,
  updateTimelineValues,
} from "../../store/slices/application";
import { useParams } from "react-router-dom";
import {
  CloseOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import MdRedactor, { mdParser } from "../mdredactor/MdRedactor";
import addAnordnungAction from "../../store/slices/actionSubslices/addAnordnungAction";
import deleteObjectAction from "../../store/slices/actionSubslices/deleteObjectAction";
import Title from "./Title";

const Text = ({ attachment, id }) => {
  const { id: applicationId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(attachment?.data?.text || "");
  const dispatch = useDispatch();

  const items = [
    {
      label: (
        <div
          onClick={() => {
            setIsEdit(true);
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
                className: "vzk_attachment_text",
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

  const getColor = (name) => {
    switch (name) {
      case "Ort":
        return "#f0fdf4";
      case "Sachverhalt":
        return "#f0fdfa";
      case "Erforderliche Maßnahmen":
        return "#f0f9ff";
      case "Widerrufsvorbehalt":
        return "#eef2ff";
      case "Fachfirmavorbehalt":
        return "#fefce8";
      case "Kostennotiz":
        return "#fdf2f8";
      case "Mit freundlichen Grüßen":
        return "#faf5ff";
    }
  };

  return (
    <div className="w-full relative py-4 before:bg-zinc-200 before:absolute before:bottom-0 before:content-[''] before:block before:left-4 before:top-0 before:w-[2px]">
      <Card
        size="small"
        type="inner"
        headStyle={{
          background: getColor(attachment.name),
        }}
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
        {isEdit ? (
          <div className="flex flex-col gap-2">
            <MdRedactor
              mdDoc={attachment?.data?.text || ""}
              getDocument={(text) => setText(text)}
            />
            <div className="w-full flex items-center gap-2 justify-end">
              <Button icon={<CloseOutlined />} onClick={() => setIsEdit(false)}>
                Abbrechen
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  dispatch(
                    addAnordnungAction({
                      className: "vzk_attachment_text",
                      data: {
                        text: text,
                        uuid: attachment.fk_uuid,
                      },
                    })
                  );
                  dispatch(
                    updateTimelineValues({
                      timelineIndex: id,
                      itemValue: text,
                      property: "text",
                      applicationId: applicationId,
                    })
                  );
                  setIsEdit(false);
                }}
              >
                Text bearbeiten
              </Button>
            </div>
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: mdParser.render(attachment?.data?.text || ""),
            }}
          />
        )}
      </Card>
    </div>
  );
};

export default Text;
