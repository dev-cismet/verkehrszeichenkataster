import { Card, Table } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { storeSelectedApplications } from "../store/slices/navigation";

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

const dates = [
  "5/1/23",
  "11/1/23",
  "16/1/23",
  "3/2/23",
  "13/2/23",
  "1/2/23",
  "23/3/23",
  "21/3/23",
  "22/3/23",
  "24/3/23",
  "6/4/23",
];

const streets = [
  "Neukuchhausen",
  "Am Schmalenhof",
  "Luisenstr.",
  "Löhrerlen",
  "Zum Lohbusch",
  "Pfeilstraße",
  "Querstr.",
  "Neumarkt",
  "Gerstenstr.",
];

const timelines = [
  [
    {
      children: "Kataster aufgenommen",
    },
    {
      children: `Lorem Ipsum.`,
    },
  ],
  [
    {
      children: "Lorem ipsum dolor sit amet",
    },
    {
      children: `consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      children: "Ut enim ad minim veniam",
    },
    {
      children:
        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    },
    {
      children:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    },
    {
      children: "Excepteur sint occaecat cupidatat non proident",
    },
    {
      color: "red",
      children: "sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
  ],
  [
    {
      children:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    },
    {
      children: `totam rem aperiam.`,
    },
    {
      color: "red",
      children:
        "eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
    },
    {
      children:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit",
    },
    {
      children:
        "sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt",
    },
    {
      children:
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur",
    },
  ],
  [
    {
      children: "adipisci velit",
    },
    {
      children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
    },
    {
      color: "red",
      children:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur",
    },
    {
      children:
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur",
    },
    {
      children: "vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
    },
  ],
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
