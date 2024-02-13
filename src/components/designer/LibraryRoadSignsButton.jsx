import { useState } from "react";
import "./designer-style.css";
import { Dropdown, Space } from "antd";
import { SettingOutlined, MoreOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getTempSignsLibMode,
  storeTempSignsLibMode,
} from "../../store/slices/application";

const LibraryRoadSignsButton = ({ connectionId }) => {
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
                "/verkehrszeichenkataster/#/verkehrszeichenbibliothek" +
                `?channel=${connectionId}`;
              window.open(url, "_blank", "popup=yes");
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
      style={{ flexShrink: 0, marginLeft: "auto" }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <div
            style={{
              background: "#ECECF4",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1px",
              borderRadius: "7px",
              width: "33px",
              height: "33px",
              border: "1px solid white",
              color: "#5B5B60",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {/* <BookOutlined /> */}
            <SettingOutlined />
            {/* <span style={{ marginLeft: "8px" }}>Bibliothek</span>
            <MoreOutlined
              style={{
                marginLeft: "16px",
                fontSize: "16px",
                marginRight: "-8px",
              }}
            /> */}
          </div>
        </Space>
      </a>
    </Dropdown>
  );
};

export default LibraryRoadSignsButton;
