import {
  PDFViewer,
  usePDF,
  Document as DocumentRenderer,
  Page,
  View,
  Text,
} from "@react-pdf/renderer";
import Document from "./Document";

const MyDoc = (
  <DocumentRenderer>
    <Page size="A4" style={{ flexDirection: "column", padding: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "column",
            gap: 24,
          }}
        >
          <Text>104.11</Text>
          <Text style={{ fontSize: 24 }}>104.23</Text>
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
        Nr.: 3/2023 Prio:
      </Text>
      <Text style={{ fontWeight: "bold", fontSize: 14 }}>
        Errichtung von Verkehrszeichen und -einrichtungen gemäß § 45 Abs. 3 StVO
      </Text>
      <View style={{ border: 2 }}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </DocumentRenderer>
);

const Viewer = () => {
  const [instance, updateInstance] = usePDF({ document: MyDoc });
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <PDFViewer className="h-full w-full">
        <Document />
      </PDFViewer>
      <a href={instance.url} download="test.pdf">
        Download
      </a>
    </div>
  );
};

export default Viewer;
