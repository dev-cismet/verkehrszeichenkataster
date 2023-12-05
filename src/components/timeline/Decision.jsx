import { Form, Select } from "antd";

const Decision = ({ id }) => {
  const [form] = Form.useForm();

  return (
    <div className="w-full">
      <Form form={form} labelCol={{ span: 2 }} wrapperCol={{ span: 10 }}>
        <Form.Item label="Beschreibung">
          <Select defaultValue={"Abgeschlossen"} id={id} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Decision;
