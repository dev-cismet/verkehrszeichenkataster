import { Input } from "antd";
import AttachmentWrapper, { AttachmentRow } from "./AttachmentWrapper";
import { useDispatch } from "react-redux";
import { updateTimelineValues } from "../../store/slices/application";
import { useParams } from "react-router-dom";

const { TextArea } = Input;

const Text = ({ attachment, id }) => {
  const { id: applicationId } = useParams();
  const dispatch = useDispatch();
  return (
    <AttachmentWrapper index={id}>
      <AttachmentRow attachment={attachment} index={id} alignTop>
        <TextArea
          rows={3}
          value={attachment.text}
          id={id}
          onChange={(e) => {
            dispatch(
              updateTimelineValues({
                timelineIndex: id,
                itemValue: e.target.value,
                property: "text",
                applicationId: applicationId,
              })
            );
          }}
        />
      </AttachmentRow>
    </AttachmentWrapper>
  );
};

export default Text;
