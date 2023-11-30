import { Timeline as AntTimeline } from "antd";

const mockExtractor = (anordnung) => {
  return anordnung;
};

const Timeline = ({ dataIn, extractor = mockExtractor }) => {
  const data = extractor(dataIn);

  return (
    <AntTimeline
      mode="alternate"
      items={[
        {
          color: "green",
          children: `Anordnung erstellt am ${data.date}`,
        },
        ...data.timeLineItems,
      ]}
    />
  );
};

export default Timeline;
