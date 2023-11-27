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

const data = [
  {
    key: "1",
    name: "Kataster 1",
    anzahl: 32,
    id: "1",
  },
  {
    key: "2",
    name: "Kataster 2",
    anzahl: 42,
    id: "2",
  },
  {
    key: "3",
    name: "Kataster 3",
    anzahl: 32,
    id: "3",
  },
  {
    key: "4",
    name: "Kataster 4",
    anzahl: 99,
    id: "4",
  },
];

const TablePage = () => {
  const dispatch = useDispatch();

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
      <Card className="h-full w-full" title="Tabelle">
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
