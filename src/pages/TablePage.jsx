import { Button, Card, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dates, maßnahmen, sachverhalte, streets } from "../assets/_data";
import {
  getAllApplications,
  storeAllApplications,
  storeSelectedApplications,
} from "../store/slices/application";

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
  const allApplications = useSelector(getAllApplications);

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
        timeline: [
          {
            id: 1,
            typ: "request",
            timestamp: "",
            sign_location: "",
            requester_postalcode: "",
            requester_city: "",
            requester_street: "",
            requester_street_number: "",
            billing_street: "",
            billing_city: "",
            billing_street_number: "",
            billing_postal_code: "",
            firstname: "",
            lastname: "",
            description: "",
            phone: "",
            time: "",
            email: "",
          },
          {
            id: 2,
            typ: "text",
            name: "Bemerkung",
            text: "",
          },
          {
            id: 3,
            typ: "decision",
            decision: "",
            name: "Entscheidung",
          },
        ],
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
      <Card
        className="h-full w-full overflow-clip"
        title="Anträge"
        extra={
          <Button
            onClick={() =>
              dispatch(storeAllApplications(generateObjectsArray(10)))
            }
          >
            Anträge laden
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={allApplications}
          rowSelection={rowSelection}
          pagination={false}
          className="w-full"
        />
      </Card>
    </div>
  );
};

export default TablePage;
