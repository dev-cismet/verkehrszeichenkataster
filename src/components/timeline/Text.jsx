import { Input } from "antd";
import { useDispatch } from "react-redux";
import {
  deleteTimelineObject,
  updateName,
} from "../../store/slices/application";
import { DeleteOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const Text = ({ attachment, id }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex items-center gap-2 pb-6">
      <div className="w-[11.5%] flex items-center justify-end">
        <Input
          bordered={false}
          value={attachment.values?.name}
          className="w-max text-end"
          onChange={(e) => {
            dispatch(
              updateName({
                index: id,
                updatedName: e.target.value,
              })
            );
          }}
        />
        <span>:</span>
      </div>
      <TextArea
        className="w-[42%]"
        rows={3}
        defaultValue={attachment.values?.text}
        id={id}
      />
      <DeleteOutlined
        className="text-lg p-2 h-fit hover:bg-zinc-100 cursor-pointer rounded-lg"
        onClick={() => {
          dispatch(deleteTimelineObject(id));
        }}
      />
    </div>
  );
};

export default Text;
