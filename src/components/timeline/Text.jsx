import { Input } from "antd";
import AttachmentWrapper, { AttachmentRow } from "./AttachmentWrapper";

const { TextArea } = Input;

const Text = ({ attachment, id }) => {
  return (
    <AttachmentWrapper index={id}>
      <AttachmentRow attachment={attachment} index={id} alignTop>
        <TextArea rows={3} defaultValue={attachment.text} id={id} />
      </AttachmentRow>
    </AttachmentWrapper>
  );
};

export default Text;
