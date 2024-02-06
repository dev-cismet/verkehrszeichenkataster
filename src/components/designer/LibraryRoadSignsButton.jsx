import { useEffect, useState, useRef } from "react";
import "./designer-style.css";
import { Input, Collapse, Divider, Dropdown, Space } from "antd";
import { BookOutlined, MoreOutlined } from "@ant-design/icons";

const LibraryRoadSignsButton = () => {
  const [open, setOpen] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setOpen(false);
    }
  };
  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };
  const items = [
    {
      label: (
        <div
          onClick={() => {
            const url =
              window.location.origin +
              "/verkehrszeichenkataster/#/verkehrszeichenbibliothek";
            window.open(url, "_blank");
          }}
        >
          Detached mode.
        </div>
      ),
      key: "1",
    },
    {
      label: "Pinned",
      key: "2",
    },
    {
      label: "Clicking me will close the menu.",
      key: "3",
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <div
            style={{
              background: "#ECECF4",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10.5px",
              borderRadius: "9px",
              width: "100px",
              color: "#5B5B60",
              fontSize: "12px",
              cursor: "pointer",
              boxSizing: "content-box",
            }}
          >
            <BookOutlined />
            <span style={{ marginLeft: "10px" }}>Bibliothek</span>
            <MoreOutlined style={{ marginLeft: "16px", fontSize: "14px" }} />
          </div>
        </Space>
      </a>
    </Dropdown>
  );
};

export default LibraryRoadSignsButton;
