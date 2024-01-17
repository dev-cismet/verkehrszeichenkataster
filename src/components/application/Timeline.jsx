import { Timeline as AntTimeline } from "antd";
import "./timeline.css";

const mockExtractor = (anordnung) => {
  return anordnung;
};

const Timeline = ({ dataIn, extractor = mockExtractor }) => {
  const data = extractor(dataIn);

  return (
    <div className="h-full w-full">
      <AntTimeline
        mode="alternate"
        items={data?.map((item) => {
          switch (item.typ) {
            case "request":
              return {
                children: "Antrag erstellt",
              };
            case "text":
              return {
                children: `${item.name ? item.name : "Text"} hinzugefügt`,
              };
            case "decision":
              return {
                children: "Antrag abgeschlossen",
              };
            case "file":
              return {
                children: `${item.name ? item.name : "Datei"} hochgeladen`,
              };
            case "drawing":
              return {
                children: `${item.name ? item.name : "Bild"} gezeichnet`,
              };
          }
        })}
      />
    </div>
  );
};

export default Timeline;
