import { Card, Dropdown, Input } from "antd";
import { useDispatch } from "react-redux";
import {
  deleteTimelineObject,
  updateName,
  updateTimelineValues,
} from "../../store/slices/application";
import { useParams } from "react-router-dom";
import { EllipsisOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const Text = ({ attachment, id }) => {
  const { id: applicationId } = useParams();
  const dispatch = useDispatch();

  const items = [
    {
      label: (
        <div
          onClick={() => {
            dispatch(
              deleteTimelineObject({
                timelineIndex: id,
                applicationId: applicationId,
              })
            );
          }}
        >
          Löschen
        </div>
      ),
      key: "0",
    },
  ];

  const getColor = (name) => {
    switch (name) {
      case "Ort":
        return "#bbf7d0";
      case "Sachverhalt":
        return "#99f6e4";
      case "Erforderliche Maßnahmen":
        return "#bae6fd";
      case "Widerrufsvorbehalt":
        return "#c7d2fe";
      case "Mit freundlichem Gruß":
        return "#e9d5ff";
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
            <Input
              onChange={(e) => {
                dispatch(
                  updateName({
                    timelineIndex: id,
                    updatedName: e.target.value,
                    applicationId: applicationId,
                  })
                );
              }}
              value={attachment.name}
              className="w-full font-medium text-lg pl-0"
              bordered={false}
            />
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
        <TextArea
          value={attachment.text}
          autoSize
          id={id}
          onChange={(e) => {
            dispatch(
              updateTimelineValues({
                timelineIndex: id,
                itemValue: e.target.value,
                property: "text",
                applicationId: applicationId,
              })
            );
          }}
        />
      </Card>
    </div>
  );
};

export default Text;
