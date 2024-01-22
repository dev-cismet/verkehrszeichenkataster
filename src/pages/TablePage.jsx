import { Card, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllApplications,
  getAllApplicationsDb,
  getSelectedApplications,
  storeSelectedApplications,
} from "../store/slices/application";
import { compare } from "../tools/helper";

const columns = [
  {
    title: "Name",
    dataIndex: "title",
  },
  {
    title: "Nr",
    dataIndex: "id",
  },
  {
    title: "Typ",
    dataIndex: ["vzk_type", "name"],
    filters: [
      {
        text: "internal",
        value: "internal",
      },
      {
        text: "external",
        value: "external",
      },
    ],
    onFilter: (value, record) => record.vzk_type.name === value,
    sorter: (a, b) => compare(a.vzk_type.name, b.vzk_type.name),
  },
  {
    title: "Status",
    dataIndex: ["vzk_status", "name"],
    filters: [
      {
        text: "offen",
        value: "offen",
      },
      {
        text: "geschlossen",
        value: "geschlossen",
      },
    ],
    onFilter: (value, record) => record.vzk_status.name === value,
  },
];

const TablePage = () => {
  const dispatch = useDispatch();
  const allApplications = useSelector(getAllApplications);
  const selectedApplications = useSelector(getSelectedApplications);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch(storeSelectedApplications(selectedRows));
    },
    selectedRowKeys: selectedApplications.map((application) => {
      return application.id;
    }),
  };

  useEffect(() => {
    dispatch(getAllApplicationsDb());
  }, []);

  return (
    <div className="h-full max-h-[calc(100vh-104px)] w-full bg-zinc-200 p-2 flex flex-col items-center gap-2">
      <Card className="h-full w-full overflow-clip" title="Anträge">
        <Table
          columns={columns}
          dataSource={allApplications}
          rowSelection={rowSelection}
          rowKey={(record) => record.id}
          pagination={false}
          className="w-full"
        />
      </Card>
    </div>
  );
};

export default TablePage;
