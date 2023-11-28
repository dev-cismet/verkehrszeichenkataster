import Sidebar from "../components/commons/Sidebar";
import { Card } from "antd";
import Map from "../components/commons/Map";

const DetailsPage = () => {
  return (
    <>
      <div className="w-full flex gap-2 items-center h-1/3">
        <Card title="Anzahl Kataster" className="w-full h-full">
          <h3 className="font-semibold text-xl">24</h3>
        </Card>
        <Card title="Antrag gestartet" className="w-full h-full">
          <h3 className="font-semibold text-xl">01.01.2020</h3>
        </Card>
        <Card title="Letzte Änderung" className="w-full h-full">
          <h3 className="font-semibold text-xl">20.11.2023</h3>
        </Card>
      </div>
      <Map height={"100%"} width={"100%"} />
    </>
  );
};

export default DetailsPage;
