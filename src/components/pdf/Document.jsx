import {
  Page,
  Text,
  View,
  Document as DocumentRenderer,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const Document = () => {
  return (
    <DocumentRenderer>
      <Page size="A4" style={{ flexDirection: "column", padding: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "column",
              gap: 24,
              //   alignItems: "flex-end",
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
          Errichtung von Verkehrszeichen und -einrichtungen gemäß § 45 Abs. 3
          StVO
        </Text>
        <View style={{ border: 2 }}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </DocumentRenderer>
  );
};

export default Document;
