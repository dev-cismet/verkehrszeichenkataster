import { Button, Card, Input, Upload } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentApplication,
  updateTimelineStatus,
} from "../../store/slices/application";
import { useParams } from "react-router-dom";

const SubmitCard = ({ changeTimeline, handleDrop }) => {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const anordnung = useSelector(getCurrentApplication);

  const tabListNoTitle = [
    {
      key: "write",
      label: "Schreiben",
    },
    {
      key: "preview",
      label: "Vorschau",
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full py-4">
      <span className="text-start text-lg font-medium">
        Kommentar Hinzufügen
      </span>
      <Card tabList={tabListNoTitle} size="small" type="inner">
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input.TextArea
            placeholder="Kommentar"
            rows={5}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <div className="flex items-center gap-4">
            <Button
              className="w-fit"
              onClick={() => {
                changeTimeline({
                  typ: "text",
                  name: "Widerrufsvorbehalt",
                  text: "Diese Genehmigung kann widerrufen werden; insbesondere wenn der zur Erteilung führende Grund wegfällt oder der Widerruf aus sonstigenb Gründen geboten ist, z.B. weil sich die zugrundeliegende Sach- oder Rechtslage ändert.",
                });
              }}
            >
              Widerrufsvorbehalt
            </Button>
            <Upload
              beforeUpload={(file) => {
                handleDrop(file);
              }}
              fileList={[]}
            >
              <Button className="w-fit">Datei</Button>
            </Upload>
            <Button>Zeichnung</Button>
          </div>
        </div>
      </Card>
      <div className="w-full flex items-center gap-2 justify-end">
        <Button
          onClick={() =>
            dispatch(
              updateTimelineStatus({
                updatedStatus:
                  anordnung.timelineStatus === "Offen"
                    ? "Geschlossen"
                    : "Offen",
                applicationId: id,
              })
            )
          }
        >
          {anordnung.timelineStatus === "Offen"
            ? "Anordnung Schließen"
            : "Anordnung öffnen"}
        </Button>
        {anordnung.timelineStatus === "Offen" && (
          <Button
            type="primary"
            onClick={() => {
              changeTimeline({ typ: "text", name: name, text: text });
              setText("");
              setName("");
            }}
            disabled={!text || !name}
          >
            Hinzufügen
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubmitCard;
