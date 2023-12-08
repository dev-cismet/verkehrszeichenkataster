import { Input } from "antd";
import AttachmentWrapper, { AttachmentRow } from "./AttachmentWrapper";
const { TextArea } = Input;

const Request = () => {
  return (
    <AttachmentWrapper>
      <div className="flex">
        <div className="w-[22%]" />
        <h4 className="w-full">Antragssteller</h4>
      </div>
      <AttachmentRow name="Stadt">
        <Input />
      </AttachmentRow>
      <AttachmentRow name="Postleitzahl">
        <Input />
      </AttachmentRow>
      <AttachmentRow name="Straße">
        <Input />
      </AttachmentRow>
      <AttachmentRow name="Hausnummer">
        <Input />
      </AttachmentRow>
      <div className="flex">
        <div className="w-[22%]" />
        <h4 className="w-full">Rechnungsadresse</h4>
      </div>
      <AttachmentRow name="Stadt">
        <Input />
      </AttachmentRow>
      <AttachmentRow name="Postleitzahl">
        <Input />
      </AttachmentRow>
      <AttachmentRow name="Straße">
        <Input />
      </AttachmentRow>
      <AttachmentRow name="Hausnummer">
        <Input />
      </AttachmentRow>
      <div className="flex">
        <div className="w-[22%]" />
        <h4 className="w-full">Weiteres</h4>
      </div>
      <AttachmentRow name="Vorname">
        <Input />
      </AttachmentRow>
      <AttachmentRow name="Nachname">
        <Input />
      </AttachmentRow>
      <AttachmentRow name="Telefonnummer">
        <Input />
      </AttachmentRow>
      <AttachmentRow name="E-Mail">
        <Input />
      </AttachmentRow>
      <AttachmentRow name="Ort des Schildes">
        <Input />
      </AttachmentRow>
      <AttachmentRow name="Beschreibung">
        <Input />
      </AttachmentRow>
      <AttachmentRow name="Uhrzeit">
        <Input />
      </AttachmentRow>
    </AttachmentWrapper>
  );
};

export default Request;
