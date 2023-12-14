import { Tag } from "antd";
import { useSelector } from "react-redux";
import { getCurrentApplication } from "../../store/slices/application";

const TagList = ({ changeTimeline }) => {
  const timeline = useSelector(getCurrentApplication).timeline;

  return (
    <>
      <span className="font-semibold text-muted-foreground">Textbausteine</span>
      <div className="flex w-full flex-wrap gap-2">
        <Tag.CheckableTag
          checked={timeline.some((obj) => obj.name === "Ort")}
          onChange={(checked) => {
            if (checked) {
              changeTimeline({
                typ: "text",
                name: "Ort",
                text: "",
              });
            }
          }}
        >
          Ort
        </Tag.CheckableTag>
        <Tag.CheckableTag
          checked={timeline.some((obj) => obj.name === "Sachverhalt")}
          onChange={(checked) => {
            if (checked) {
              changeTimeline({
                typ: "text",
                name: "Sachverhalt",
                text: "",
              });
            }
          }}
        >
          Sachverhalt
        </Tag.CheckableTag>
        <Tag.CheckableTag
          checked={timeline.some(
            (obj) => obj.name === "Erforderliche Maßnahmen"
          )}
          onChange={(checked) => {
            if (checked) {
              changeTimeline({
                typ: "text",
                name: "Erforderliche Maßnahmen",
                text: "",
              });
            }
          }}
        >
          Erforderliche Maßnahmen
        </Tag.CheckableTag>
        <Tag.CheckableTag
          checked={timeline.some((obj) => obj.name === "Widerrufsvorbehalt")}
          onChange={(checked) => {
            if (checked) {
              changeTimeline({
                typ: "text",
                name: "Widerrufsvorbehalt",
                text: "Diese Genehmigung kann widerrufen werden; insbesondere wenn der zur Erteilung führende Grund wegfällt oder der Widerruf aus sonstigen Gründen geboten ist, z.B. weil sich die zugrundeliegende Sach- oder Rechtslage ändert.",
              });
            }
          }}
        >
          Widerrufsvorbehalt
        </Tag.CheckableTag>
        <Tag.CheckableTag
          checked={timeline.some(
            (obj) => obj.name === "Mit freundlichen Grüßen"
          )}
          onChange={(checked) => {
            if (checked) {
              changeTimeline({
                typ: "text",
                name: "Mit freundlichen Grüßen",
                text: "",
              });
            }
          }}
        >
          MFG
        </Tag.CheckableTag>
      </div>
    </>
  );
};

export default TagList;
