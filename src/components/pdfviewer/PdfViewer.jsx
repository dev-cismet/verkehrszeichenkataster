import { useState, useEffect } from "react";
import { pdfBase64Example } from "./pdfbase64example";

const PdfViewer = ({
  filePdf = pdfBase64Example,
  width = "100%",
  height = "700px",
}) => {
  const [createdLinks, setCreatedLinks] = useState([]);

  useEffect(() => {
    const convertBase64ToUrlLink = (pdfdecoded) => {
      if (filePdf) {
        const byteCharacters = atob(pdfdecoded);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const file = new Blob([byteArray], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setCreatedLinks((prev) => [...prev, fileURL]);
        return fileURL;
      } else {
        return "";
      }
    };

    convertBase64ToUrlLink(filePdf);

    return () => {
      createdLinks.forEach((link) => URL.revokeObjectURL(link));
    };
  }, [filePdf]);

  return (
    <iframe
      title="PDF Viewer"
      src={createdLinks[createdLinks.length - 1]}
      style={{ width, height }}
    />
  );
};

export default PdfViewer;
