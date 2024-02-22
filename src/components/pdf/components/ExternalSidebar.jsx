import { Text, View } from "@react-pdf/renderer";

const ExternalSidebar = () => {
  return (
    <View style={{ flexDirection: "column", gap: 17, fontSize: 8 }}>
      <View style={{ flexDirection: "column", gap: 1 }}>
        <Text style={{ fontFamily: "Open Sans", fontWeight: 700, fontSize: 9 }}>
          Stadt Wuppertal
        </Text>
        <Text style={{ fontFamily: "Open Sans", fontWeight: 700 }}>
          Der Oberbürgermeister
        </Text>
        <Text>Ressort 104.11</Text>
        <Text>Straßen und Verkehr</Text>
        <Text>Johannes-Rau-Platz 1</Text>
        <Text>42275 Wuppertal</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text style={{ fontFamily: "Open Sans", fontWeight: 700 }}>
          Ansprechpartner/in
        </Text>
        <Text>Max Mustermann</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text style={{ fontFamily: "Open Sans", fontWeight: 700 }}>Az</Text>
        <Text>624/2023</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text style={{ fontFamily: "Open Sans", fontWeight: 700 }}>
          Telefon
        </Text>
        <Text>624/2023</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text style={{ fontFamily: "Open Sans", fontWeight: 700 }}>
          Telefax
        </Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text style={{ fontFamily: "Open Sans", fontWeight: 700 }}>E-Mail</Text>
        <Text>max.mustermann@</Text>
        <Text>stadt.wuppertal.de</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text style={{ fontFamily: "Open Sans", fontWeight: 700 }}>Zimmer</Text>
        <Text>C-481</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text style={{ fontFamily: "Open Sans", fontWeight: 700 }}>
          Sprechzeiten
        </Text>
        <Text>nach Vereinbarung</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text style={{ fontFamily: "Open Sans", fontWeight: 700 }}>
          Bankverbindung
        </Text>
        <Text>Stadt Wuppertal</Text>
        <Text>BIC</Text>
        <Text>IBAN</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text style={{ fontFamily: "Open Sans", fontWeight: 700 }}>
          Internet
        </Text>
        <Text>www.wuppertal.de</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text style={{ fontFamily: "Open Sans", fontWeight: 700 }}>
          Newsletter
        </Text>
        <Text>www.wuppertal.de/news</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text style={{ fontFamily: "Open Sans", fontWeight: 700 }}>
          De-Mail-Postfach
        </Text>
        <Text>info@</Text>
        <Text>stadt.wuppertal.de-</Text>
        <Text>mail.de</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text style={{ fontFamily: "Open Sans", fontWeight: 700 }}>
          Servicecenter
        </Text>
        <Text>+49 123 456-0</Text>
      </View>
      <View
        style={{ flexDirection: "column", gap: 2 }}
        render={({ pageNumber, totalPages }) => (
          <View style={{ fontSize: 8 }}>
            <Text
              style={{ fontFamily: "Open Sans", fontWeight: 700, fontSize: 8 }}
            >
              Seite
            </Text>
            <Text style={{ fontSize: 8 }}>
              {pageNumber} von {totalPages}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ExternalSidebar;
