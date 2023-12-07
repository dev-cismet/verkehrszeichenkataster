import AttachmentWrapper, { AttachmentRow } from "./AttachmentWrapper";

const File = ({ attachment, i }) => {
  const url = attachment.values?.url;

  return (
    <AttachmentWrapper index={i}>
      <AttachmentRow attachment={attachment} index={i}>
        {url.includes("image") ? (
          <div className="w-full rounded-lg">
            <img
              key={i}
              alt={attachment.values?.name}
              className="w-full rounded-lg"
              src={url}
            />
          </div>
        ) : (
          <div className="w-full rounded-lg h-64 flex items-center justify-center border-solid border-zinc-200">
            Vorschau für den Dateitypen konnte nicht erstellt werden
          </div>
        )}
      </AttachmentRow>
    </AttachmentWrapper>
  );
};

export default File;
