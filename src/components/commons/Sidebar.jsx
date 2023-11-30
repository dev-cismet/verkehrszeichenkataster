import {
  EditOutlined,
  FormOutlined,
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
  StockOutlined,
} from "@ant-design/icons";
import { Collapse } from "antd";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./collapsible.css";
import { useSelector } from "react-redux";
import { getSelectedApplication } from "../../store/slices/application";

const SidebarItem = ({ link, text, icon, isCollapsed }) => {
  const location = useLocation();

  return (
    <Link relative="path" to={link}>
      <div
        className={`flex gap-4 items-center py-2 px-3 hover:bg-zinc-100 cursor-pointer rounded-lg ${
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
  const location = useLocation();

  const selectedApplication = useSelector(getSelectedApplication);

  const items = [
    {
      key: "1",
      label: isCollapsed ? "" : "Kataster",
      children: (
        <div className="flex flex-col gap-1">
          <Link relative="path" to="kataster/1">
            <span
              className={`${
                location.pathname.includes("kataster/1") && "text-primary"
              } w-full p-2`}
            >
              Kataster 1
            </span>
          </Link>
          <Link relative="path" to="kataster/2">
            <span
              className={`${
                location.pathname.includes("kataster/2") && "text-primary"
              } w-full p-2`}
            >
              Kataster 2
            </span>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <aside
      className={`relative flex h-full ${isCollapsed ? "w-16" : "w-56"} ${
        isResetting && "transition-all duration-300 ease-in-out"
      } flex-col gap-4 overflow-y-auto bg-white p-2 text-lg`}
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
          <RightOutlined className="absolute right-2 top-6 h-6 w-6 p-1 cursor-pointer hover:bg-zinc-100" />
        ) : (
          <LeftOutlined className="absolute right-2 top-6 h-6 w-6 p-1 cursor-pointer hover:bg-zinc-100" />
        )}
      </div>

      <h2
        className={`font-semibold text-lg truncate ${
          isCollapsed && "invisible"
        }`}
      >
        {"Anordnung " + selectedApplication?.name}
      </h2>
      <SidebarItem
        link="uebersicht"
        icon={<HomeOutlined className="text-lg" />}
        isCollapsed={isCollapsed}
        text="Übersicht"
      />
      <SidebarItem
        link="verlauf"
        icon={<StockOutlined className="text-lg" />}
        isCollapsed={isCollapsed}
        text="Verlauf"
      />

      <Collapse
        items={items}
        ghost
        className="hover:bg-zinc-100"
        size="small"
      />
      <SidebarItem
        link="zeichnen"
        icon={<EditOutlined className="text-lg" />}
        isCollapsed={isCollapsed}
        text="Zeichnen"
      />
      <SidebarItem
        link="form"
        icon={<FormOutlined className="text-lg" />}
        isCollapsed={isCollapsed}
        text="Form"
      />
    </aside>
  );
};

export default Sidebar;
