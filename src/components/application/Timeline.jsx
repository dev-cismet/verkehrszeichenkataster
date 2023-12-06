import { Timeline as AntTimeline } from "antd";

const mockExtractor = (anordnung) => {
  return anordnung;
};

const Timeline = ({ dataIn, extractor = mockExtractor }) => {
  const data = extractor(dataIn);

  return (
    <AntTimeline
      mode="alternate"
      items={data.map((item) => {
        switch (item.type) {
          case "antrag":
            return {
              children: "Antrag erstellt",
            };
          case "text":
            return {
              children: "Bemerkung hinzugefügt",
            };
          case "entscheidung":
            return {
              children: "Antrag abgeschlossen",
            };
          case "file":
            return {
              children: "Datei hochgeladen",
            };
        }
      })}
    />
  );
};

export default Timeline;
