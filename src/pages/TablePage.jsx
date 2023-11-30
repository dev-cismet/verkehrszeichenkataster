import { Card, Table } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { storeSelectedApplications } from "../store/slices/navigation";
import {
  dates,
  maßnahmen,
  sachverhalte,
  streets,
  timelines,
} from "../assets/_data";

const columns = [
  {
    title: "No.",
    dataIndex: "name",
  },
  {
    title: "Anzahl",
    dataIndex: "anzahl",
  },
  {
    title: "Datum",
    dataIndex: "date",
  },
  {
    title: "Straße",
    dataIndex: "street",
  },
];

const TablePage = () => {
  const dispatch = useDispatch();

  const generateObjectsArray = (number) => {
    let objectsArray = [];
    for (let i = 1; i <= number; i++) {
      let randomAnzahl = Math.floor(Math.random() * 100);
      let obj = {
        key: i,
        name: i,
        anzahl: randomAnzahl,
        date: dates[Math.floor(Math.random() * dates.length)],
        street: streets[Math.floor(Math.random() * streets.length)],
        id: i,
        timeLineItems: timelines[Math.floor(Math.random() * timelines.length)],
        sachverhalt:
          sachverhalte[Math.floor(Math.random() * sachverhalte.length)],
        maßnahmen: maßnahmen[Math.floor(Math.random() * maßnahmen.length)],
      };
      objectsArray.push(obj);
    }
    return objectsArray;
  };

  const data = generateObjectsArray(10);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch(storeSelectedApplications(selectedRows));
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  return (
    <div className="h-full max-h-[calc(100vh-73px)] w-full bg-zinc-200 p-2 flex flex-col items-center gap-2">
      <Card className="h-full w-full overflow-clip" title="Anträge">
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          pagination={false}
          className="w-full"
        />
      </Card>
    </div>
  );
};

export default TablePage;
