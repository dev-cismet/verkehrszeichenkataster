import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  deleteTimelineObject,
  updateName,
} from "../../store/slices/application";
import { Input } from "antd";

export const AttachmentRow = ({ attachment, index, children }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="w-[11.5%] flex items-center justify-end">
        <Input
          bordered={false}
          value={attachment.values?.name}
          className="w-max text-end"
          onChange={(e) => {
            dispatch(
              updateName({
                index: index,
                updatedName: e.target.value,
              })
            );
          }}
        />
        <span>:</span>
      </div>
      {children}
    </>
  );
};

const AttachmentWrapper = ({ children, index }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex w-full gap-2 items-center pb-6">
      <div className="h-full border-[1px] border-solid border-black" />
      {children}
      <DeleteOutlined
        className="text-lg p-2 hover:bg-zinc-100 cursor-pointer rounded-lg"
        onClick={() => {
          dispatch(deleteTimelineObject(index));
        }}
      />
    </div>
  );
};

export default AttachmentWrapper;
