import { useState } from "react";
import "./designer-style.css";
import { Dropdown, Space } from "antd";
import { BookOutlined, MoreOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getTempSignsLibMode,
  storeTempSignsLibMode,
} from "../../store/slices/application";

const LibraryRoadSignsButton = () => {
  const signLibMode = useSelector(getTempSignsLibMode);
  const dispatch = useDispatch();
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
        <>
          <div
            onClick={() => {
              dispatch(storeTempSignsLibMode("detached"));

              const url =
                window.location.origin +
                "/verkehrszeichenkataster/#/verkehrszeichenbibliothek";
              window.open(url, "_blank");
            }}
          >
            Detached
          </div>
        </>
      ),
      key: "1",
    },
    {
      label: (
        <>
          <div
            onClick={() => {
              dispatch(storeTempSignsLibMode("timeline"));
            }}
          >
            Timeline
          </div>
        </>
      ),
      key: "2",
    },
    {
      label: (
        <>
          <div
            onClick={() => {
              dispatch(storeTempSignsLibMode("overlay"));
            }}
          >
            Overlay
          </div>
        </>
      ),
      key: "3",
    },
    {
      label: (
        <>
          <div
            onClick={() => {
              if (signLibMode === "inside") {
                dispatch(storeTempSignsLibMode("inside-cosed"));
              } else {
                dispatch(storeTempSignsLibMode("inside"));
              }
            }}
          >
            {signLibMode === "inside-cosed" ? "Inside closed" : "Inside"}
          </div>
        </>
      ),
      key: "4",
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
            <span style={{ marginLeft: "8px" }}>Bibliothek</span>
            <MoreOutlined
              style={{
                marginLeft: "16px",
                fontSize: "16px",
                marginRight: "-8px",
              }}
            />
          </div>
        </Space>
      </a>
    </Dropdown>
  );
};

export default LibraryRoadSignsButton;
