import {
  AuditOutlined,
  CommentOutlined,
  DownOutlined,
  EditOutlined,
  FileOutlined,
  FormOutlined,
  HomeOutlined,
  LeftOutlined,
  PicLeftOutlined,
  PullRequestOutlined,
  RightOutlined,
  SlidersOutlined,
  StockOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getCurrentApplication,
  getTimeline,
} from "../../store/slices/application";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faSignsPost } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

const SidebarItem = ({
  link,
  text,
  icon,
  isSidebarCollapsed,
  collapsable,
  customAction,
  index,
  children,
}) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showCustomAction, setShowCustomAction] = useState(false);

  const scrollToItem = () => {
    document.getElementById(index)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        className={`flex gap-4 items-center relative py-2 px-3 hover:bg-zinc-100 cursor-pointer rounded-lg ${
          location.pathname.includes(link) && "text-primary"
        }`}
        onMouseEnter={() => setShowCustomAction(true)}
        onMouseLeave={() => setShowCustomAction(false)}
        onClick={() => scrollToItem()}
      >
        {icon}
        {!isSidebarCollapsed && (
          <h4 className="mb-0 w-full truncate">{text ? text : "Text"}</h4>
        )}
        {collapsable && (
          <div className="flex w-fit items-center gap-1 justify-end">
            {showCustomAction && (
              <div className="p-1 hover:bg-zinc-200 rounded-lg">
                {customAction}
              </div>
            )}
            <div className="p-1 hover:bg-zinc-200 rounded-lg">
              {isCollapsed ? (
                <DownOutlined
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCollapsed(false);
                  }}
                />
              ) : (
                <RightOutlined
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCollapsed(true);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
      {collapsable && isCollapsed && (
        <div className="ml-3 flex flex-col gap-1">{children}</div>
      )}
    </>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const selectedApplication = useSelector(getCurrentApplication);
  const currentTimeline =
    selectedApplication?.vzk_anordnung_timelineArrayRelationShip;

  const getIcon = (type, name) => {
    switch (name) {
      case "Ort":
        return <HomeOutlined className="text-lg" />;
      case "Sachverhalt":
        return <PicLeftOutlined className="text-lg" />;
      case "Erforderliche Maßnahmen":
        return <SlidersOutlined className="text-lg" />;
      case "Widerrufsvorbehalt":
        return <AuditOutlined className="text-lg" />;
      case "Mit freundlichen Grüßen":
        return <CommentOutlined className="text-lg" />;
    }
    switch (type) {
      case "request":
        return <FormOutlined className="text-lg" />;
      case "text":
        return <FontAwesomeIcon icon={faFileLines} />;
      case "file":
        return <FileOutlined className="text-lg" />;
      case "drawing":
        return <FontAwesomeIcon icon={faPencil} />;
    }
  };

  return (
    <aside className="relative flex min-w-[175px] w-72 h-full transition-all duration-300 ease-in-out flex-col gap-4 overflow-y-auto bg-white p-2 text-lg">
      {currentTimeline?.map((item, i) => (
        <SidebarItem
          // link={"verlauf"}
          icon={getIcon(item.vzk_attachment_typ.name.toLowerCase(), item.name)}
          isSidebarCollapsed={isCollapsed}
          text={
            item.vzk_attachment_typ.name.toLowerCase() === "request"
              ? "Anfrage"
              : item.name === "Mit freundlichen Grüßen"
              ? "MfG"
              : item.name
          }
          key={`sidebar_timeline_${i}`}
          index={i}
        />
      ))}

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
