import {
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
  StockOutlined,
} from "@ant-design/icons";
import { Collapse } from "antd";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ link, text, icon, isCollapsed }) => {
  const location = useLocation();

  return (
    <Link relative="path" to={link}>
      <div
        className={`flex gap-4 items-center py-2 px-3 hover:bg-zinc-100 cursor-pointer ${
          location.pathname.includes(link) && "text-primary"
        }`}
      >
        {icon}
        {!isCollapsed && <h4 className="mb-0">{text}</h4>}
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const text = "Lorem ipsum";

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
      <SidebarItem
        link="uebersicht"
        icon={<HomeOutlined className="text-lg" />}
        isCollapsed={isCollapsed}
        text="Übersicht"
      />
      <SidebarItem
        link="timeline"
        icon={<StockOutlined className="text-lg" />}
        isCollapsed={isCollapsed}
        text="Timeline"
      />

      <Collapse
        items={items}
        ghost
        className="hover:bg-zinc-100"
        size="small"
      />
    </aside>
  );
};

export default Sidebar;
