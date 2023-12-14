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

  return (
    <div className="w-full relative py-4 before:bg-zinc-200 before:absolute before:bottom-0 before:content-[''] before:block before:left-4 before:top-0 before:w-1">
      <Card
        size="small"
        type="inner"
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
          rows={3}
          value={attachment.text}
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
