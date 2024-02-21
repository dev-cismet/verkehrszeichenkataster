import { Button, Card, Dropdown } from "antd";
import {
  CloseOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  deleteTimelineObject,
  updateTimelineValues,
} from "../../store/slices/application";
import { useParams } from "react-router-dom";
import { getDataTypeFromBase64 } from "../../tools/helper";
import PdfViewer from "../pdfviewer/PdfViewer";
import Title from "./Title";
import deleteObjectAction from "../../store/slices/actionSubslices/deleteObjectAction";
import { useState } from "react";
import MdRedactor, { mdParser } from "../mdredactor/MdRedactor";
import addAnordnungAction from "../../store/slices/actionSubslices/addAnordnungAction";

const File = ({ attachment, index }) => {
  const { id: applicationId } = useParams();
  const url = attachment?.data?.file;

  const [showEditor, setShowEditor] = useState(false);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const items = [
    {
      label: (
        <div
          onClick={() => {
            setShowEditor(true);
          }}
        >
          Beschreibung{" "}
          {attachment?.data?.description ? "bearbeiten" : "hinzufügen"}
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div
          onClick={() => {
            dispatch(
              deleteObjectAction({
                className: "vzk_attachment_file",
                data: {
                  uuid: attachment?.fk_uuid,
                },
              })
            );
            dispatch(
              deleteObjectAction({
                className: "vzk_anordnung_timeline",
                data: {
                  uuid: attachment?.uuid,
                },
              })
            );
            dispatch(
              deleteTimelineObject({
                timelineIndex: index,
              })
            );
          }}
        >
          Entfernen
        </div>
      ),
      key: "1",
    },
  ];

  return (
    <div
      id={index}
      className="w-full relative py-4 before:bg-zinc-200 before:absolute before:bottom-0 before:content-[''] before:block before:left-4 before:top-0 before:w-[2px]"
    >
      <Card
        size="small"
        type="inner"
        title={
          <div className="w-full flex">
            <Title attachment={attachment} index={index} />
            <Dropdown
              trigger={["click"]}
              menu={{ items }}
              placement="bottomRight"
            >
              <div className="p-1 flex items-center justify-center hover:bg-zinc-100 rounded-lg cursor-pointer">
                <EllipsisOutlined className="text-2xl" />
              </div>
            </Dropdown>
          </div>
        }
      >
        {showEditor && (
          <div className="flex flex-col gap-2 mb-2">
            <MdRedactor
              mdDoc={attachment?.data?.description}
              getDocument={(text) => setDescription(text)}
            />
            <div className="w-full flex items-center gap-2 justify-end">
              <Button
                icon={<CloseOutlined />}
                onClick={() => setShowEditor(false)}
              >
                Abbrechen
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  dispatch(
                    addAnordnungAction({
                      className: "vzk_attachment_file",
                      data: {
                        description: description,
                        uuid: attachment.fk_uuid,
                      },
                    })
                  );
                  dispatch(
                    updateTimelineValues({
                      timelineIndex: index,
                      itemValue: description,
                      property: "description",
                      applicationId: applicationId,
                    })
                  );
                  setShowEditor(false);
                }}
              >
                Beschreibung{" "}
                {attachment?.data?.description ? "bearbeiten" : "hinzufügen"}
              </Button>
            </div>
          </div>
        )}
        {attachment?.data?.description && (
          <div
            dangerouslySetInnerHTML={{
              __html: mdParser.render(attachment?.data?.description || ""),
            }}
          />
        )}
        {url && (
          <>
            {getDataTypeFromBase64(url) === "image" && (
              <div className="w-full rounded-lg">
                <img
                  key={index}
                  alt={attachment?.name}
                  className="max-w-full rounded-lg"
                  src={url}
                />
              </div>
            )}
            {getDataTypeFromBase64(url) === "pdf" && (
              <div className="w-full rounded-lg">
                <PdfViewer filePdf={url} />
              </div>
            )}
            {getDataTypeFromBase64(url) === "other" && (
              <div className="w-full rounded-lg h-64 flex items-center justify-center border-solid border-zinc-200">
                Vorschau für den Dateitypen konnte nicht erstellt werden
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default File;
