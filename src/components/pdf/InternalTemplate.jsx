import {
  Page,
  Text,
  View,
  Document,
  Image,
  Svg,
  Path,
} from "@react-pdf/renderer";

const BorderedText = ({ title, text }) => {
  return (
    <View
      style={{
        border: 1,
        textAlign: "left",
        fontSize: 12,
        padding: 4,
        gap: 6,
        marginBottom: 20,
      }}
    >
      <Text style={{ fontFamily: "Open Sans", fontStyle: "italic" }}>
        {title}:
      </Text>
      <Text style={{ lineHeight: 1.6, fontSize: 11 }}>{text}</Text>
    </View>
  );
};

const InternalTemplate = ({ timeline, title, requester, receiver, id }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          flexDirection: "column",
          padding: 20,
          gap: 6,
          fontSize: 12,
        }}
      >
        <View fixed={true}>
          <Svg style={{ height: 46 }} x="0px" y="0px">
            <Path
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
            padding: 10,
            fontSize: 14,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "Open Sans", fontWeight: "bold" }}>
            Stadt Wuppertal /{" "}
          </Text>
          <Text>Strassen und Verkehr</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 44,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              gap: 24,
            }}
          >
            <Text style={{ fontSize: 10 }}>{requester}</Text>
            <Text style={{ fontSize: 14 }}>{receiver}</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 2,
              alignItems: "flex-end",
              fontFamily: "Open Sans",
            }}
          >
            <Text>05.01.2023/ 563 5195</Text>
            <Text>Max.Mustermann@stadt.wuppertal.de</Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 40,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: 700,
              fontFamily: "Open Sans",
              paddingBottom: 12,
              paddingHorizontal: 4,
            }}
          >
            Nr.: {id}/2023 Prio:
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 12,
              fontFamily: "Open Sans",
              paddingBottom: 6,
              paddingHorizontal: 4,
            }}
          >
            {title}
          </Text>
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
          <Text style={{ paddingBottom: 16, fontSize: 12, lineHeight: 1.6 }}>
            Mit der Bitte, die vorstehende aufgeführte/n Maßnahme/n nach § 45
            Abs. 5 StVO zu veranlassen und den Tag der Durchführung auf der
            Durchschrift mit zu teilen.
          </Text>
          <Text
            style={{
              paddingBottom: 16,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "Open Sans",
            }}
          >
            2 - Polizeipräsident / Direktion Verkehr - z.K.
          </Text>
          <Text
            style={{
              paddingBottom: 16,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "Open Sans",
            }}
          >
            3 - z.V.
          </Text>
          <Text style={{ paddingBottom: 16, fontSize: 12 }}>i.A.</Text>
          <Text style={{ paddingBottom: 16, fontSize: 12 }}>
            Max Mustermann
          </Text>
          <Text style={{ paddingBottom: 16, fontSize: 12 }}>An 104. 11</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 16,
            }}
          >
            <Text>Die angeordnete/n Maßnahme/n wurden/n am</Text>
            <Text>durchgeführt.</Text>
          </View>
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
                // style={{ width: "100%", border: "1px solid red" }}
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
