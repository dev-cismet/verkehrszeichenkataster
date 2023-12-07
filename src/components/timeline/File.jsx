import { Input } from "antd";
import { useDispatch } from "react-redux";
import {
  deleteTimelineObject,
  updateName,
} from "../../store/slices/application";
import { DeleteOutlined } from "@ant-design/icons";

const File = ({ attachment, i }) => {
  const dispatch = useDispatch();
  const url = attachment.values?.url;

  return (
    <div className="flex w-full gap-2 items-center pb-6" key={i}>
      <div className="h-full border-[1px] border-solid border-black" />

      <div className="w-[11.5%] flex items-center justify-end">
        <Input
          bordered={false}
          value={attachment.values?.name}
          className="w-max text-end"
          onChange={(e) => {
            dispatch(
              updateName({
                index: i,
                updatedName: e.target.value,
              })
            );
          }}
        />
        <span>:</span>
      </div>
      {url.includes("image") ? (
        <img
          key={i}
          alt={attachment.values?.name}
          className="w-[42%] rounded-lg"
          src={url}
        />
      ) : (
        <div className="w-[42%] rounded-lg h-64 flex items-center justify-center border-solid border-zinc-200">
          Vorschau für den Dateitypen konnte nicht erstellt werden
        </div>
      )}
      <DeleteOutlined
        className="text-lg p-2 hover:bg-zinc-100 cursor-pointer rounded-lg"
        onClick={() => {
          dispatch(deleteTimelineObject(i));
        }}
      />
    </div>
  );
};

export default File;
