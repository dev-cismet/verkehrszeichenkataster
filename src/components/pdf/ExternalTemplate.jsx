import {
  Page,
  Text,
  View,
  Document,
  Image,
  Svg,
  Path,
} from "@react-pdf/renderer";
import ExternalSidebar from "./components/ExternalSidebar";
import Contact from "./components/Contact";
import { mdParser } from "../mdredactor/MdRedactor";
import { Html } from "react-pdf-html";

const TextWithTitle = ({ title, text }) => {
  const stylesheet = {
    p: {
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 1,
      paddingBottom: 4,
      fontSize: 9,
    },
    "*": {
      fontFamily: "Open Sans",
    },
    div: {
      fontSize: 10,
    },
    li: {
      margin: 0,
      padding: 0,
    },
    ol: {
      margin: 0,
      padding: 0,
    },
    pre: {
      fontSize: 10,
    },
    table: {
      fontSize: 9,
      marginLeft: 54,
    },
  };
  return (
    <View
      style={{
        textAlign: "left",
        fontSize: 10,
      }}
    >
      {title !== "Fachfirmavorbehalt" && title !== "Kostennotiz" && (
        <Text
          style={{
            textDecoration: title !== "Mit freundlichen Grüßen" && "underline",
            paddingTop: 6,
            paddingBottom: 1,
          }}
        >
          {title}
        </Text>
      )}

      <View style={{ maxWidth: "96%" }}>
        <Html stylesheet={stylesheet}>
          {text && mdParser.render(text).replace(/<\/?code>/g, "")}
        </Html>
      </View>
    </View>
  );
};

const ExternalTemplate = ({ timeline, title, id }) => {
  const request = timeline?.find((obj) => obj.name === "Anfrage");

  return (
    <Document>
      <Page
        size="A4"
        style={{
          paddingHorizontal: 72,
          paddingTop: 78,
          paddingBottom: 86,
          fontSize: 14,
        }}
      >
        <View fixed={true}>
          <Svg style={{ height: 46 }} x="0px" y="0px">
            <Path
              style={{
                transform: "scale(0.35 0.35)",
                position: "absolute",
                top: 0,
                left: 0,
                padding: 0,
              }}
              fill="rgb(0, 0, 0)"
              d="M69.6,38.5H0v0.1c0.2,3.6,3.1,6.5,6.7,6.5H63c0.9,0,1.8-0.2,2.6-0.6
	C68,43.5,69.5,41.2,69.6,38.5 M57,36h12.6v-7.3H57V36z M42.7,36h12.6v-7.3H42.7V36z M28.5,36h12.6v-7.3H28.5V36z M14.2,36h12.6v-7.3
	H14.2V36z M12.6,28.8H0V36h12.6L12.6,28.8L12.6,28.8z M145.4,6.8h2.2V0.1h-2.2c-9.5,0.1-17,7.8-17,17.3v5.7h0v5.7
	c0,0.8-0.6,1.4-1.4,1.5c-0.8,0-1.4-0.6-1.5-1.4c0,0,0,0,0,0v-5.7h0v-5.7C125.8,8,118.4,0.2,109,0c-9.4-0.2-17.2,7.2-17.4,16.6
	c0,0.3,0,0.5,0,0.8v5.7h0v5.7c0,0.8-0.6,1.4-1.4,1.5c-0.8,0-1.4-0.6-1.5-1.4c0,0,0,0,0,0v0l0,0v-5.7l0,0v-5.7
	c0.1-9.5-7.5-17.2-17-17.3H0v6.7h71.8c5.8,0.1,10.5,4.8,10.4,10.6v5.7h0v5.7c-0.2,4.4,3.3,8.1,7.7,8.3c4.4,0.2,8.1-3.3,8.3-7.7
	c0-0.2,0-0.4,0-0.6V17.4c-0.1-5.8,4.5-10.5,10.2-10.6S118.9,11.2,119,17c0,0.1,0,0.3,0,0.4v5.7h0v5.7c-0.2,4.4,3.3,8.1,7.7,8.3
	c4.4,0.2,8.1-3.3,8.3-7.7c0-0.2,0-0.4,0-0.6V17.4C135,11.6,139.6,6.9,145.4,6.8L145.4,6.8L145.4,6.8z M54.3,15.9v3.7H15.2v-3.7H54.3
	z M147.6,15.9V9.3h-2.2c-4.4,0-8,3.7-8,8.1c0,0,0,0,0,0v11.4c0.1,5.8-4.5,10.5-10.2,10.6s-10.5-4.5-10.6-10.2c0-0.1,0-0.3,0-0.4
	v-5.7h0v-5.7c0-4.4-3.6-8-8-8s-8,3.6-8,8v11.4c0.1,5.8-4.5,10.5-10.2,10.6S79.9,35,79.7,29.3c0-0.1,0-0.3,0-0.4v-5.7h0v-5.7
	c0-4.4-3.5-8.1-8-8.1H0v6.7h11.8v3.7H6.5C3,19.9,0.2,22.7,0,26.3h69.6c-0.1-2.7-1.7-5-4.1-6.1c-0.8-0.4-1.7-0.6-2.6-0.6h-5v-3.7
	h13.9v0c0.8,0,1.4,0.7,1.4,1.5v5.7l0,0v5.7c-0.2,9.4,7.3,17.1,16.7,17.3c9.4,0.2,17.1-7.3,17.3-16.7c0-0.2,0-0.4,0-0.6v-5.7h0v-5.7
	l0,0v0c0-0.8,0.6-1.4,1.4-1.5c0.8,0,1.4,0.6,1.5,1.4c0,0,0,0,0,0v5.7l0,0v5.7c-0.2,9.4,7.2,17.2,16.6,17.4
	c9.4,0.2,17.2-7.2,17.4-16.6c0-0.3,0-0.5,0-0.8v-5.7h0v-5.7c0-0.8,0.6-1.4,1.4-1.5v0L147.6,15.9L147.6,15.9z"
            />
          </Svg>
        </View>
        <View
          fixed
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            padding: 0,
            paddingHorizontal: 72,
            paddingBottom: 73,
            fontSize: 12,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "Open Sans", fontWeight: "bold" }}>
            STADT WUPPERTAL /{" "}
          </Text>
          <Text>STRASSEN UND VERKEHR</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 6,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "column", width: "100%" }}>
            <Contact request={request?.data} />
            <View style={{ textAlign: "right", width: "100%", fontSize: 11 }}>
              <Text>15.01.2024</Text>
            </View>
            <Text
              style={{
                textDecoration: "underline",
                fontFamily: "Open Sans",
                fontWeight: 700,
                fontSize: 11,
                maxWidth: "96%",
              }}
            >
              {title}
            </Text>
            <Text style={{ fontSize: 10 }}>(Anordnung Nr. {id}/2024)</Text>
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
                return (
                  <View style={{ flexDirection: "column" }}>
                    {attachment?.data?.description && (
                      <Text
                        style={{
                          paddingBottom: 8,
                          fontWeight: 700,
                          fontFamily: "Open Sans",
                        }}
                      >
                        {attachment?.data?.description}
                      </Text>
                    )}
                    <Image key={attachment.uuid} src={attachment?.data?.file} />
                  </View>
                );
              } else if (
                attachment.vzk_attachment_typ.name.toLowerCase() ===
                  "drawing" &&
                attachment?.data?.drawing
              ) {
                const drawingObject = JSON.parse(attachment.data.drawing);
                return (
                  <div
                    key={attachment.uuid}
                    // style={{ width: "100%", border: "1px solid red" }}
                  >
                    {attachment?.data?.description && (
                      <Text
                        style={{
                          paddingBottom: 8,
                          fontWeight: 700,
                          fontFamily: "Open Sans",
                        }}
                      >
                        {attachment?.data?.description}
                      </Text>
                    )}
                    <Image
                      src={drawingObject.base64Preview}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                );
              }
            })}
          </View>

          <ExternalSidebar />
        </View>
      </Page>
    </Document>
  );
};

export default ExternalTemplate;
