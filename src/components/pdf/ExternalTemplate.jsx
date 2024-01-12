import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import ExternalSidebar from "./components/ExternalSidebar";
import Contact from "./components/Contact";

const ExternalTemplate = () => {
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
        </View>
        <ExternalSidebar />
      </Page>
    </Document>
  );
};

export default ExternalTemplate;
