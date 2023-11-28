import {
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
  StockOutlined,
} from "@ant-design/icons";
import { Collapse } from "antd";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const text = "Lorem ipsum";
  const location = useLocation();

  const items = [
    {
      key: "1",
      label: "Kataster",
      children: <p>{text}</p>,
    },
  ];

  return (
    <aside
      className={`relative flex h-full ${isCollapsed ? "w-20" : "w-60"} ${
        isResetting && "transition-all duration-300 ease-in-out"
      } flex-col gap-2 overflow-y-auto bg-white p-2 text-lg`}
    >
      <div
        role="button"
        onClick={() => {
          setIsResetting(true);
          setIsCollapsed(!isCollapsed);
          setTimeout(() => setIsResetting(false), 200);
        }}
      >
        {isCollapsed ? (
          <RightOutlined className="absolute right-2 top-3 h-6 w-6 p-1 cursor-pointer hover:bg-zinc-100" />
        ) : (
          <LeftOutlined className="absolute right-2 top-3 h-6 w-6 p-1 cursor-pointer hover:bg-zinc-100" />
        )}
      </div>

      <h2 className="font-semibold text-lg truncate">Anordnung</h2>
      <Link relative="path" to="uebersicht">
        <div
          className={`flex gap-4 items-center p-2 hover:bg-zinc-100 cursor-pointer ${
            location.pathname.includes("/uebersicht") && "text-primary"
          }`}
        >
          <HomeOutlined className="text-lg" />
          {!isCollapsed && <h4 className="mb-0">Übersicht</h4>}
        </div>
      </Link>
      <Link relative="path" to="timeline">
        <div
          className={`flex gap-4 items-center p-2 hover:bg-zinc-100 cursor-pointer ${
            location.pathname.includes("/timeline") && "text-primary"
          }`}
        >
          <StockOutlined className="text-lg" />
          {!isCollapsed && <h4 className="mb-0">Timeline</h4>}
        </div>
      </Link>
      <Collapse items={items} ghost />
    </aside>
  );
};

export default Sidebar;
