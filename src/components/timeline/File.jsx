import { Card, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteTimelineObject } from "../../store/slices/application";
import { useParams } from "react-router-dom";
import { getDataTypeFromBase64 } from "../../tools/helper";
import PdfViewer from "../pdfviewer/PdfViewer";
import Title from "./Title";
import deleteObjectAction from "../../store/slices/actionSubslices/deleteObjectAction";

const File = ({ attachment, index }) => {
  const { id: applicationId } = useParams();
  const url = attachment?.data?.file;

  const dispatch = useDispatch();

  const items = [
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
      key: "0",
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
