import {
  CheckOutlined,
  DownOutlined,
  EditOutlined,
  FileOutlined,
  FileTextOutlined,
  FormOutlined,
  HomeOutlined,
  LeftOutlined,
  PlusOutlined,
  PullRequestOutlined,
  RightOutlined,
  StockOutlined,
} from "@ant-design/icons";
import { Collapse, Modal } from "antd";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./collapsible.css";
import { useSelector } from "react-redux";
import { getSelectedApplication } from "../../store/slices/application";

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
  const location = useLocation();
  const [timelineItems, setTimelineItems] = useState([
    {
      link: "1",
      icon: <StockOutlined className="text-lg" />,
      text: "Test 1",
    },
    {
      link: "2",
      icon: <StockOutlined className="text-lg" />,
      text: "Test 2",
    },
    {
      link: "3",
      icon: <StockOutlined className="text-lg" />,
      text: "Test 3",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        isSidebarCollapsed={isCollapsed}
        text="Übersicht"
      />
      <SidebarItem
        link="verlauf"
        icon={<StockOutlined className="text-lg" />}
        isSidebarCollapsed={isCollapsed}
        text="Verlauf"
        collapsable={true}
        customAction={<PlusOutlined onClick={() => setIsModalOpen(true)} />}
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

      <Collapse
        items={items}
        ghost
        className="hover:bg-zinc-100"
        size="small"
      />
      <SidebarItem
        link="zeichnen"
        icon={<EditOutlined className="text-lg" />}
        isSidebarCollapsed={isCollapsed}
        text="Zeichnen"
      />
      <SidebarItem
        link="form"
        icon={<FormOutlined className="text-lg" />}
        isSidebarCollapsed={isCollapsed}
        text="Form"
      />
      <Modal
        title="Anhang hinzufügen"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="grid grid-cols-3 gap-2">
          <ModalItem
            icon={<EditOutlined className="text-lg" />}
            text="Zeichnung"
            onClick={() => {
              setTimelineItems((items) => [
                ...items,
                {
                  link: "Zeichnung 1",
                  icon: <EditOutlined className="text-lg" />,
                  text: "Zeichnung 1",
                },
              ]);
              setIsModalOpen(false);
            }}
          />
          <ModalItem
            icon={<FileOutlined className="text-lg" />}
            text="Datei"
            onClick={() => {
              setTimelineItems((items) => [
                ...items,
                {
                  link: "Datei 1",
                  icon: <FileOutlined className="text-lg" />,
                  text: "Datei 1",
                },
              ]);
              setIsModalOpen(false);
            }}
          />
          <ModalItem
            icon={<PullRequestOutlined className="text-lg" />}
            text="Anfrage"
            onClick={() => {
              setTimelineItems((items) => [
                ...items,
                {
                  link: "Anfrage 1",
                  icon: <PullRequestOutlined className="text-lg" />,
                  text: "Anfrage 1",
                },
              ]);
              setIsModalOpen(false);
            }}
          />
          <ModalItem
            icon={<FileTextOutlined className="text-lg" />}
            text="Text"
            onClick={() => {
              setTimelineItems((items) => [
                ...items,
                {
                  link: "Text 1",
                  icon: <FileTextOutlined className="text-lg" />,
                  text: "Text 1",
                },
              ]);
              setIsModalOpen(false);
            }}
          />
          <ModalItem
            icon={<CheckOutlined className="text-lg" />}
            text="Entscheidung"
            onClick={() => {
              setTimelineItems((items) => [
                ...items,
                {
                  link: "Entscheidung 1",
                  icon: <CheckOutlined className="text-lg" />,
                  text: "Entscheidung 1",
                },
              ]);
              setIsModalOpen(false);
            }}
          />
        </div>
      </Modal>
    </aside>
  );
};

export default Sidebar;