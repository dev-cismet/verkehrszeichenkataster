import { Input } from "antd";

const { TextArea } = Input;

const Text = ({ value }) => {
  return <TextArea rows={3} autoFocus defaultValue={value} />;
};

export default Text;
