import { Input } from "antd";
import AttachmentWrapper, { AttachmentRow } from "./AttachmentWrapper";
const { TextArea } = Input;

const Request = () => {
  return (
    <AttachmentWrapper>
      <AttachmentRow name="Ort">
        <Input />
      </AttachmentRow>
      <AttachmentRow name="Sachverhalt">
        <Input />
      </AttachmentRow>
      <AttachmentRow name="Erforderliche Maßnahmen">
        <TextArea cols={3} />
      </AttachmentRow>
    </AttachmentWrapper>
  );
};

export default Request;
