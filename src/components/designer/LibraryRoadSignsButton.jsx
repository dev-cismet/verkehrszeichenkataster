import { useState } from "react";
import "./designer-style.css";
import { Dropdown, Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { storeSignsLibMode } from "../../store/slices/signsLibrary";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignsPost } from "@fortawesome/free-solid-svg-icons";

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
        <div
          onClick={() => {
            dispatch(storeSignsLibMode("timeline"));
            setCurrentMode("timeline");
          }}
        >
          Zeitleiste
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          onClick={() => {
            dispatch(storeSignsLibMode("inside"));
            setCurrentMode("inside");
          }}
        >
          Innerhalb
        </div>
      ),
      key: "2",
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
        <FontAwesomeIcon icon={faSignsPost} />
      </div>
    </Dropdown>
  );
};

export default LibraryRoadSignsButton;
