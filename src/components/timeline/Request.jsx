import { Form, Input } from "antd";
const { TextArea } = Input;

const Request = () => {
  const [form] = Form.useForm();

  return (
    <div id="Antrag" className="w-full">
      <Form form={form} labelCol={{ span: 2 }} wrapperCol={{ span: 10 }}>
        <Form.Item label="Ort">
          <Input />
        </Form.Item>
        <Form.Item label="Postleitzahl">
          <Input />
        </Form.Item>
        <Form.Item label="Name">
          <Input />
        </Form.Item>
        <Form.Item label="Mail">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Request;
