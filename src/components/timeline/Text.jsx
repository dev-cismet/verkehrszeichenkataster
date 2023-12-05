import { Input } from "antd";

const { TextArea } = Input;

const Text = ({ value, id }) => {
  return <TextArea rows={3} autoFocus defaultValue={value} id={id} />;
};

export default Text;
