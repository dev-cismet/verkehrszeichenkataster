import { Text, View } from "@react-pdf/renderer";

const Contact = ({ request }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        gap: 1,
        paddingTop: 40,
        paddingBottom: 40,
        fontSize: 10,
        lineHeight: 1,
      }}
    >
      <Text style={{ fontSize: 6 }}>
        Stadt Wuppertal - 104.11 - 42269 Wuppertal
      </Text>
      <Text>Herr</Text>
      <Text>
        {request?.firstname} {request?.lastname}
      </Text>
      <Text>Muster GmBH</Text>
      <Text>
        {request?.requester_street} {request?.requester_street_number}
      </Text>
      <Text>
        {request?.requester_postalcode} {request?.requester_city}
      </Text>
    </View>
  );
};

export default Contact;
