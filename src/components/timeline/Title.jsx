import { Input } from "antd";
import { useDebounce } from "@uidotdev/usehooks";
import { useDispatch } from "react-redux";
import addAnordnungAction from "../../store/slices/actionSubslices/addAnordnungAction";
import { updateName } from "../../store/slices/application";
import { useState } from "react";

const Title = ({ attachment, index }) => {
  const [title, setTitle] = useState(attachment.name || "");
  const debouncedTitle = useDebounce(title, 700);

  const dispatch = useDispatch();

  if (debouncedTitle !== attachment.name && debouncedTitle === title) {
    dispatch(
      addAnordnungAction({
        className: "vzk_anordnung_timeline",
        data: {
          uuid: attachment?.uuid,
          name: debouncedTitle,
        },
      })
    );

    dispatch(
      updateName({
        timelineIndex: index,
        updatedName: debouncedTitle,
      })
    );
  }

  return (
    <Input
      onChange={(e) => {
        setTitle(e.target.value);
      }}
      defaultValue={title}
      // value={attachment.name}
      placeholder="Text"
      className="w-full font-medium text-lg pl-0"
      bordered={false}
    />
  );
};

export default Title;
