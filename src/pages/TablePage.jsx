import { Card, Table } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { storeSelectedApplications } from "../store/slices/navigation";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Anzahl",
    dataIndex: "anzahl",
  },
];

const TablePage = () => {
  const dispatch = useDispatch();

  const generateObjectsArray = (number) => {
    let objectsArray = [];
    for (let i = 1; i <= number; i++) {
      let randomAnzahl = Math.floor(Math.random() * 101); // Random number between 0 and 100
      let obj = {
        key: i,
        name: "Anordnung " + i,
        anzahl: randomAnzahl,
        id: i,
      };
      objectsArray.push(obj);
    }
    return objectsArray;
  };

  const data = generateObjectsArray(30);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
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
