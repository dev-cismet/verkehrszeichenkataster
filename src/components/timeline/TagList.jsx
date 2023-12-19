import { Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTimelineObject,
  getCurrentApplication,
} from "../../store/slices/application";
import { useParams } from "react-router-dom";
import "./tags.css";

const TagList = ({ changeTimeline }) => {
  const { id } = useParams();
  const timeline = useSelector(getCurrentApplication).timeline;
  const dispatch = useDispatch();

  return (
    <>
      <span className="font-semibold text-muted-foreground pb-2">
        Textbausteine
      </span>
      <div className="flex w-full flex-wrap gap-1">
        <Tag.CheckableTag
          checked={timeline.some((obj) => obj.name === "Ort")}
          onChange={(checked) => {
            if (checked) {
              changeTimeline({
                typ: "text",
                name: "Ort",
                text: "",
              });
            } else {
              const index = timeline.findIndex((obj) => obj.name === "Ort");
              if (index >= 0) {
                dispatch(
                  deleteTimelineObject({
                    timelineIndex: index,
                    applicationId: id,
                  })
                );
              }
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
            } else {
              const index = timeline.findIndex(
                (obj) => obj.name === "Sachverhalt"
              );
              if (index >= 0) {
                dispatch(
                  deleteTimelineObject({
                    timelineIndex: index,
                    applicationId: id,
                  })
                );
              }
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
            } else {
              const index = timeline.findIndex(
                (obj) => obj.name === "Erforderliche Maßnahmen"
              );
              if (index >= 0) {
                dispatch(
                  deleteTimelineObject({
                    timelineIndex: index,
                    applicationId: id,
                  })
                );
              }
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
                text: `Diese Genehmigung kann widerrufen werden; insbesondere wenn der zur Erteilung führende Grund wegfällt oder der Widerruf aus sonstigen Gründen geboten ist, z.B. weil sich die zugrundeliegende Sach- oder Rechtslage ändert.`,
              });
            } else {
              const index = timeline.findIndex(
                (obj) => obj.name === "Widerrufsvorbehalt"
              );
              if (index >= 0) {
                dispatch(
                  deleteTimelineObject({
                    timelineIndex: index,
                    applicationId: id,
                  })
                );
              }
            }
          }}
        >
          Widerrufsvorbehalt
        </Tag.CheckableTag>
        <Tag.CheckableTag
          checked={timeline.some((obj) => obj.name === "Mit freundlichem Gruß")}
          onChange={(checked) => {
            if (checked) {
              changeTimeline({
                typ: "text",
                name: "Mit freundlichem Gruß",
                text: "",
              });
            } else {
              const index = timeline.findIndex(
                (obj) => obj.name === "Mit freundlichem Gruß"
              );
              if (index >= 0) {
                dispatch(
                  deleteTimelineObject({
                    timelineIndex: index,
                    applicationId: id,
                  })
                );
              }
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
