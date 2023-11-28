import { HomeOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  return (
    <aside
      className={`relative flex h-full ${isCollapsed ? "w-20" : "w-60"} ${
        isResetting && "transition-all duration-300 ease-in-out"
      } flex-col overflow-y-auto bg-white p-2`}
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
          <RightOutlined className="absolute right-2 top-2 h-6 w-6 p-1 cursor-pointer hover:bg-zinc-100" />
        ) : (
          <LeftOutlined className="absolute right-2 top-2 h-6 w-6 p-1 cursor-pointer hover:bg-zinc-100" />
        )}
      </div>
      {isCollapsed ? (
        <HomeOutlined className="h-6 w-6 text-xl" />
      ) : (
        <h2 className="font-semibold text-lg">Anordnung</h2>
      )}
    </aside>
  );
};

export default Sidebar;
