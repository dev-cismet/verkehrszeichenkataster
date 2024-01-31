import { Page, Text, View, Document, Image } from "@react-pdf/renderer";

const BorderedText = ({ title, text }) => {
  return (
    <View
      style={{
        border: 1,
        textAlign: "left",
        fontSize: 14,
        padding: 6,
        gap: 6,
      }}
    >
      <Text>{title}:</Text>
      <Text>{text}</Text>
    </View>
  );
};

const InternalTemplate = ({ timeline, title, requester, receiver, id }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{ flexDirection: "column", padding: 20, gap: 6, fontSize: 12 }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "column",
              gap: 24,
            }}
          >
            <Text style={{ fontSize: 14 }}>{requester}</Text>
            <Text style={{ fontSize: 20 }}>{receiver}</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 2,
              alignItems: "flex-end",
            }}
          >
            <Text>05.01.2023/ 563 5195</Text>
            <Text>Max.Mustermann@stadt.wuppertal.de</Text>
          </View>
        </View>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Nr.: {id}/2023 Prio:
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 14 }}>{title}</Text>
        {timeline.map((attachment) => {
          if (attachment.vzk_attachment_typ.name.toLowerCase() === "text") {
            return (
              <BorderedText
                key={attachment.uuid}
                title={attachment.name}
                text={attachment?.data?.text}
              />
            );
          }
        })}
        <Text style={{ paddingBottom: 6 }}>
          Mit der Bitte, die vorstehende aufgeführte/n Maßnahme/n nach § 45 Abs.
          5 StVO zu veranlassen und den Tag der Durchführung auf der
          Durchschrift mit zu teilen.
        </Text>
        <Text style={{ paddingBottom: 6 }}>
          2 - Polizeipräsident / Direktion Verkehr - z.K.
        </Text>
        <Text style={{ paddingBottom: 6 }}>3 - z.V.</Text>
        <Text style={{ paddingBottom: 6 }}>i.A.</Text>
        <Text style={{ paddingBottom: 6 }}>Max Mustermann</Text>
        <Text>An 104. 11</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Die angeordnete/n Maßnahme/n wurden/n am</Text>
          <Text>durchgeführt.</Text>
        </View>
        {timeline.map((attachment) => {
          if (attachment.vzk_attachment_typ.name.toLowerCase() === "file") {
            return <Image key={attachment.uuid} src={attachment?.data?.file} />;
          }
        })}

        {timeline.map((attachment) => {
          if (
            attachment.vzk_attachment_typ.name.toLowerCase() === "drawing" &&
            attachment?.data?.drawing
          ) {
            const drawingObject = JSON.parse(attachment.data.drawing);
            return (
              <div
                key={attachment.uuid}
                style={{ width: "100%", border: "1px solid red" }}
              >
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
      </Page>
    </Document>
  );
};

export default InternalTemplate;
