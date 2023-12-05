import { Form, Input } from "antd";
const { TextArea } = Input;

const Request = () => {
  const [form] = Form.useForm();

  return (
    <div id="Antrag" className="w-1/2">
      <h1>Antrag</h1>
      <Form layout="vertical" form={form}>
        <Form.Item label="Ort">
          <Input />
        </Form.Item>
        <Form.Item label="Postleitzahl">
          <Input />
        </Form.Item>
        <Form.Item label="Name">
          <Input />
        </Form.Item>
        <Form.Item label="Beschreibung">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Mail">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Request;
