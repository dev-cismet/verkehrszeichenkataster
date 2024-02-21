import { useState } from "react";
import "./designer-style.css";
import { Dropdown, Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { storeSignsLibMode } from "../../store/slices/signsLibrary";
import { useSearchParams } from "react-router-dom";

const LibraryRoadSignsButton = ({
  connectionId,
  setCurrentMode,
  setIsdragging,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [urlParams, setUrlParams] = useSearchParams();
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
              dispatch(storeSignsLibMode("detached"));
              setCurrentMode("detached");
              setIsdragging(true);
              const url =
                window.location.origin +
                "/verkehrszeichenkataster/#/verkehrszeichenbibliothek" +
                `?channel=${connectionId}`;
              window.open(url, "_blank", "popup=yes");
            }}
          >
            Getrennt
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
              dispatch(storeSignsLibMode("timeline"));
              setCurrentMode("timeline");
            }}
          >
            Zeitleiste
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
              dispatch(storeSignsLibMode("overlay"));
              setCurrentMode("overlay");
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
              dispatch(storeSignsLibMode("inside"));
              setCurrentMode("inside");
            }}
          >
            Innerhalb
          </div>
        </>
      ),
      key: "4",
    },
    {
      label: (
        <>
          <div
            onClick={() => {
              dispatch(storeSignsLibMode("none"));
              setCurrentMode("none");
              setUrlParams({ channel: connectionId, mode: "none" });
            }}
          >
            Schließen
          </div>
        </>
      ),
      key: "5",
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
            <SettingOutlined />
          </div>
        </Space>
      </a>
    </Dropdown>
  );
};

export default LibraryRoadSignsButton;
