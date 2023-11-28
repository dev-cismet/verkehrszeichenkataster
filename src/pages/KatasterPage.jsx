import { Button, Input } from "antd";

const { TextArea } = Input;

const KatasterPage = () => {
  return (
    <div className="py-10 flex flex-col gap-6 w-1/2">
      <h1 className="text-lg font-semibold">Kataster Form</h1>
      <Input placeholder="Name" />
      <Input placeholder="Bearbeitet von" />
      <Input placeholder="Platzhalter" />
      <TextArea rows={3} placeholder="Beschreibung" />
      <Button type="primary">Absenden</Button>
    </div>
  );
};

export default KatasterPage;
