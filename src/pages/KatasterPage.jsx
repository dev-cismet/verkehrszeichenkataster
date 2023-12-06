import { Card, Select, Input, Checkbox, DatePicker } from "antd";
import Map from "../components/commons/Map";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const KatasterPage = () => {
  return (
    <Card
      bodyStyle={{
        overflowY: "auto",
        overflowX: "clip",
        maxHeight: "96%",
        height: "100%",
      }}
      className="h-full w-full"
      title={<span className="text-2xl">Standort 5903</span>}
    >
      <div className="h-full w-full flex flex-col gap-2">
        <div className="w-full flex gap-2 h-3/4">
          <Map width="70%" height="100%" />
          <Card
            bodyStyle={{
              height: "100%",
            }}
            title="Bild"
            className="w-[30%]"
            size="small"
          >
            <div className="h-full w-full flex items-center justify-center">
              Kein Bild verfügbar
            </div>
          </Card>
        </div>
        <div className="flex gap-2 items-center">
          <span>Schilder zum Zeitpunkt:</span>
          <DatePicker className="w-50" format="DD.MM.YYYY" />
        </div>
        <Card
          size="small"
          title="Schild"
          extra={
            <div className="flex items-center gap-6">
              <MinusOutlined className="cursor-pointer" />{" "}
              <PlusOutlined className="cursor-pointer" />
            </div>
          }
        >
          <div className="h-full w-full grid grid-cols-12 gap-2 gap-y-4">
            <span className="col-span-1">Position:</span>
            <Select className="col-span-8" />
            <div className="col-span-1 flex items-center">
              <ArrowDownOutlined />
              <span className="w-full text-center">2</span>
              <ArrowUpOutlined />
            </div>
            <div className="col-span-2"></div>
            <span className="col-span-1">Verkehrszeichen:</span>
            <Select className="col-span-1" />
            <Select className="col-span-7" />
            <div className="col-span-1 flex items-center justify-center">
              <Checkbox>Privat</Checkbox>
            </div>
            <div className="col-span-2"></div>
            <span className="col-span-1">Beschriftung:</span>
            <TextArea className="col-span-9" rows={4} />
            <div className="col-span-2"></div>
            <span className="col-span-1">Verfügungsnummer:</span>
            <Select className="col-span-7" />
            <div className="col-span-2 flex gap-2 items-center">
              <span className="w-full">Gültig von:</span>
              <Select className="w-full" />
            </div>
            <div className="col-span-2 flex gap-2 items-center">
              <span>bis:</span>
              <Select className="w-full" />
            </div>
            <span className="col-span-1">Bemerkung:</span>
            <TextArea className="col-span-11" rows={4} />
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default KatasterPage;
