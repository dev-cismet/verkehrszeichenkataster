import { Form, Input } from "antd";
const { TextArea } = Input;

const Request = () => {
  const [form] = Form.useForm();

  return (
    <div id="Antrag" className="w-full">
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 10 }}>
        <Form.Item label="Ort">
          <Input />
        </Form.Item>
        <Form.Item label="Sachverhalt">
          <Input />
        </Form.Item>
        <Form.Item label="Erforderliche Maßnahmen">
          <TextArea cols={3} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Request;
