import { Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTimelineObject,
  getCurrentApplication,
} from "../../store/slices/application";
import { useParams } from "react-router-dom";
import "./tags.css";
import addAnordnungAction from "../../store/slices/actionSubslices/addAnordnungAction";
import { v4 as uuidv4 } from "uuid";

const TagList = ({ changeTimeline }) => {
  const { id } = useParams();
  const timeline = useSelector(
    getCurrentApplication
  )?.vzk_anordnung_timelineArrayRelationShip;
  const dispatch = useDispatch();

  const checkIfTimelineContainsText = (text) => {
    return timeline?.some((obj) => obj.name === text);
  };

  const onSelect = (name, text) => {
    const uuid = uuidv4();
    const timelineObjectId = uuidv4();
    dispatch(
      addAnordnungAction({
        className: "vzk_attachment_text",
        data: {
          text: text,
          uuid: uuid,
        },
      })
    );
    const timelineForDb = timeline.map((object) => {
      const bigTimeline = { ...object };
      delete bigTimeline.data;
      return bigTimeline;
    });
    dispatch(
      addAnordnungAction({
        className: "vzk_anordnung",
        data: {
          uuid: id,
          vzk_anordnung_timelineArrayRelationShip: [
            ...timelineForDb,
            {
              name: name,
              fk_uuid: uuid,
              uuid: timelineObjectId,
              vzk_attachment_typ: {
                id: 2,
                name: "Text",
              },
            },
          ],
        },
      })
    );

    changeTimeline({
      name: name,
      fk_uuid: uuid,
      uuid: timelineObjectId,
      data: {
        text: text,
      },
      vzk_attachment_typ: {
        id: 2,
        name: "Text",
      },
    });
  };

  return (
    <>
      <span className="font-semibold text-muted-foreground pb-2">
        Textbausteine
      </span>
      <div className="flex w-full flex-wrap gap-[5px]">
        <Tag.CheckableTag
          checked={checkIfTimelineContainsText("Ort")}
          className={`${
            checkIfTimelineContainsText("Ort")
              ? "bg-green-600 hover:bg-green-500"
              : "bg-transparent"
          }`}
          onChange={(checked) => {
            if (checked) {
              onSelect("Ort", "");
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
          checked={checkIfTimelineContainsText("Sachverhalt")}
          className={`${
            checkIfTimelineContainsText("Sachverhalt")
              ? "bg-teal-600 hover:bg-teal-500"
              : "bg-transparent"
          }`}
          onChange={(checked) => {
            if (checked) {
              onSelect("Sachverhalt", "");
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
          checked={checkIfTimelineContainsText("Erforderliche Maßnahmen")}
          className={`${
            checkIfTimelineContainsText("Erforderliche Maßnahmen")
              ? "bg-sky-600 hover:bg-sky-500"
              : "bg-transparent"
          }`}
          onChange={(checked) => {
            if (checked) {
              onSelect("Erforderliche Maßnahmen", "");
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
          checked={checkIfTimelineContainsText("Widerrufsvorbehalt")}
          className={`${
            checkIfTimelineContainsText("Widerrufsvorbehalt")
              ? "bg-indigo-600 hover:bg-indigo-500"
              : "bg-transparent"
          }`}
          onChange={(checked) => {
            if (checked) {
              onSelect(
                "Widerrufsvorbehalt",
                "Diese Genehmigung kann widerrufen werden; insbesondere wenn der zur Erteilung führende Grund wegfällt oder der Widerruf aus sonstigen Gründen geboten ist, z.B. weil sich die zugrundeliegende Sach- oder Rechtslage ändert."
              );
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
          checked={checkIfTimelineContainsText("Fachfirmavorbehalt")}
          className={`${
            checkIfTimelineContainsText("Fachfirmavorbehalt")
              ? "bg-yellow-600 hover:bg-yellow-500"
              : "bg-transparent"
          }`}
          onChange={(checked) => {
            if (checked) {
              onSelect(
                "Fachfirmavorbehalt",
                `Für die Aufbringung der Markierung wenden Sie sich bitte an eine der nachstehen genannten Vertragsfirmen der Stadt Wuppertal.

                Firma Tuschhoff                                              Firma Brüntrup
                Heidestr. 32                                                    Rödiger Str. 40
                42349 Wuppertal                                            42283 Wuppertal
                Tel. (0202) 47 04 03                                        Tel. (0202) 55 40 16
                FAX (0202) 47 19 32                                       FAX (0202) 55 40 17`
              );
            } else {
              const index = timeline.findIndex(
                (obj) => obj.name === "Fachfirmavorbehalt"
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
          Fachfirmavorbehalt
        </Tag.CheckableTag>
        <Tag.CheckableTag
          checked={checkIfTimelineContainsText("Kostennotiz")}
          className={`${
            checkIfTimelineContainsText("Kostennotiz")
              ? "bg-pink-600 hover:bg-pink-500"
              : "bg-transparent"
          }`}
          onChange={(checked) => {
            if (checked) {
              onSelect(
                "Kostennotiz",
                "Gem. § 16 Straßen- und Wegegesetz NW sind die Kosten der Aufbringung, Unterhaltung und Entfernung der Markierung von Ihnen als Antragsteller zu tragen."
              );
            } else {
              const index = timeline.findIndex(
                (obj) => obj.name === "Kostennotiz"
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
          Kostennotiz
        </Tag.CheckableTag>
        <Tag.CheckableTag
          checked={checkIfTimelineContainsText("Mit freundlichen Grüßen")}
          className={`${
            checkIfTimelineContainsText("Mit freundlichen Grüßen")
              ? "bg-purple-600 hover:bg-purple-500"
              : "bg-transparent"
          }`}
          onChange={(checked) => {
            if (checked) {
              onSelect("Mit freundlichen Grüßen", "");
            } else {
              const index = timeline.findIndex(
                (obj) => obj.name === "Mit freundlichen Grüßen"
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
          MfG
        </Tag.CheckableTag>
      </div>
    </>
  );
};

export default TagList;
