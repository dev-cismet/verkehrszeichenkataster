import { Input } from "antd";
import AttachmentWrapper, { AttachmentRow } from "./AttachmentWrapper";

const { TextArea } = Input;

const Text = ({ attachment, id }) => {
  return (
    <AttachmentWrapper>
      <AttachmentRow attachment={attachment} index={id}>
        <TextArea
          className="w-[42%]"
          rows={3}
          defaultValue={attachment.values?.text}
          id={id}
        />
      </AttachmentRow>
    </AttachmentWrapper>
  );
};

export default Text;
