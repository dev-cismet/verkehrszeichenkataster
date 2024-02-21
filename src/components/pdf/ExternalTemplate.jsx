import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import ExternalSidebar from "./components/ExternalSidebar";
import Contact from "./components/Contact";
import { mdParser } from "../mdredactor/MdRedactor";
import { Html } from "react-pdf-html";

const TextWithTitle = ({ title, text }) => {
  return (
    <View
      style={{
        textAlign: "left",
        fontSize: 14,
        gap: 6,
      }}
    >
      {title !== "Fachfirmavorbehalt" && title !== "Kostennotiz" && (
        <Text style={{ textDecoration: "underline", paddingTop: 10 }}>
          {title}
        </Text>
      )}
      <View style={{ maxWidth: "70%" }}>
        <Html style={{ fontSize: 12 }}>
          {text && mdParser.render(text).replace(/<\/?code>/g, "")}
        </Html>
      </View>
    </View>
  );
};

const ExternalTemplate = ({ timeline, title }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          flexDirection: "row",
          padding: 20,
          gap: 6,
          fontSize: 14,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <View fixed={true}>
            <Text>Wupperwurm</Text>
          </View>
          <Contact />
          <View style={{ textAlign: "right" }}>
            <Text>15.01.2024</Text>
          </View>
          <Text style={{ textDecoration: "underline" }}>{title}</Text>
          <Text style={{ fontSize: 10 }}>(Anordnung Nr. 001/2024)</Text>
          {timeline?.map((attachment, i) => {
            if (attachment.vzk_attachment_typ.name.toLowerCase() === "text") {
              return (
                <TextWithTitle
                  key={`pdf_` + i}
                  title={attachment.name}
                  text={attachment?.data?.text}
                />
              );
            } else if (
              attachment.vzk_attachment_typ.name.toLowerCase() === "file"
            ) {
              return <Image key={`pdf_` + i} src={attachment?.data?.file} />;
            } else if (
              attachment.vzk_attachment_typ.name.toLowerCase() === "drawing"
            ) {
              return <Image key={`pdf_` + i} src={attachment.preview} />;
            }
          })}
        </View>

        <ExternalSidebar />
      </Page>
    </Document>
  );
};

export default ExternalTemplate;
