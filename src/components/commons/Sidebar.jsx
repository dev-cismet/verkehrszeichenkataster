import {
  DownOutlined,
  FormOutlined,
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
  StockOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./collapsible.css";
import { useSelector } from "react-redux";
import { getSelectedApplication } from "../../store/slices/application";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignsPost } from "@fortawesome/free-solid-svg-icons";

const SidebarItem = ({
  link,
  text,
  icon,
  isSidebarCollapsed,
  collapsable,
  customAction,
  children,
}) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showCustomAction, setShowCustomAction] = useState(false);

  return (
    <>
      <Link relative="path" to={link}>
        <div
          className={`flex gap-4 items-center py-2 px-3 hover:bg-zinc-100 cursor-pointer rounded-lg ${
            location.pathname.includes(link) && "text-primary"
          }`}
          onMouseEnter={() => setShowCustomAction(true)}
          onMouseLeave={() => setShowCustomAction(false)}
        >
          {icon}
          {!isSidebarCollapsed && <h4 className="mb-0">{text}</h4>}
          {collapsable && (
            <div className="flex w-full items-center gap-1 justify-end">
              {showCustomAction && (
                <div className="p-1 hover:bg-zinc-200 rounded-lg">
                  {customAction}
                </div>
              )}
              <div className="p-1 hover:bg-zinc-200 rounded-lg">
                {isCollapsed ? (
                  <DownOutlined onClick={() => setIsCollapsed(false)} />
                ) : (
                  <RightOutlined onClick={() => setIsCollapsed(true)} />
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
      {collapsable && isCollapsed && (
        <div className="ml-2 flex flex-col gap-1">{children}</div>
      )}
    </>
  );
};

const ModalItem = ({ icon, text, onClick }) => {
  return (
    <div
      className="rounded-lg p-2 flex flex-col gap-1 items-center justify-center hover:bg-zinc-100 cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <p className="mb-0">{text}</p>
    </div>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [timelineItems, setTimelineItems] = useState([
    {
      link: "verlauf/antrag",
      icon: <FormOutlined className="text-lg" />,
      text: "Antrag",
    },
  ]);

  const selectedApplication = useSelector(getSelectedApplication);

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
        isSidebarCollapsed={isCollapsed}
        text="Übersicht"
      />
      <SidebarItem
        link="verlauf"
        icon={<StockOutlined className="text-lg" />}
        isSidebarCollapsed={isCollapsed}
        text="Verlauf"
        collapsable={true}
      >
        {timelineItems.map((item) => (
          <SidebarItem
            link={item.link}
            icon={item.icon}
            isSidebarCollapsed={isCollapsed}
            text={item.text}
          />
        ))}
      </SidebarItem>

      <SidebarItem
        link="kataster/1"
        icon={<FontAwesomeIcon icon={faSignsPost} />}
        isSidebarCollapsed={isCollapsed}
        text="Kataster"
        collapsable={true}
      >
        <SidebarItem
          link="kataster/1"
          icon={<FontAwesomeIcon icon={faSignsPost} />}
          isSidebarCollapsed={isCollapsed}
          text="Standort 5903"
        />
        <SidebarItem
          link="kataster/2"
          icon={<FontAwesomeIcon icon={faSignsPost} />}
          isSidebarCollapsed={isCollapsed}
          text="Standort 5904"
        />
      </SidebarItem>
    </aside>
  );
};

export default Sidebar;
