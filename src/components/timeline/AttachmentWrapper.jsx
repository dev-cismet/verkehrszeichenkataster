import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  deleteTimelineObject,
  updateName,
} from "../../store/slices/application";
import { Input } from "antd";

export const AttachmentRow = ({ attachment, index, name, children }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex items-center gap-2">
      <div className="w-[22%] flex items-center justify-end">
        {name ? (
          <span className="w-full text-end px-2 py-1">{name}</span>
        ) : (
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
        )}
        <span>:</span>
      </div>
      {children}
    </div>
  );
};

const AttachmentWrapper = ({ children, index }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex w-full gap-2 items-center pb-6">
      <div className="h-full border-[1px] border-solid border-black" />
      <div className="flex flex-col w-2/3 gap-6">{children}</div>
      {index && (
        <DeleteOutlined
          className="text-lg p-2 hover:bg-zinc-100 cursor-pointer rounded-lg"
          onClick={() => {
            dispatch(deleteTimelineObject(index));
          }}
        />
      )}
    </div>
  );
};

export default AttachmentWrapper;
