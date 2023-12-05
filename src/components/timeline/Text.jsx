import { Form, Input } from "antd";

const { TextArea } = Input;

const Text = ({ value, id }) => {
  const [form] = Form.useForm();

  return (
    <div className="w-full">
      <Form form={form} labelCol={{ span: 2 }} wrapperCol={{ span: 10 }}>
        <Form.Item label="Bemerkung">
          <TextArea rows={3} defaultValue={value} id={id} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Text;
