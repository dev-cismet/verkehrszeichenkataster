import { useState } from "react";
import LibSignDrawer from "./LibSignDrawer";
import { BookOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignsPost } from "@fortawesome/free-solid-svg-icons";

const floatingBtnStyle = {
  position: "fixed",
  bottom: " 20px",
  right: "20px",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "#ececf4",
  color: "#222222",
  fontSize: "24px",
  border: "none",
  cursor: "pointer",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  zIndex: "1001",
};

const FloatingSignLibButton = () => {
  const [open, setOpen] = useState(false);
  const closeDrawerHandler = () => setOpen(false);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={floatingBtnStyle}
        className="flex items-center justify-center"
      >
        <FontAwesomeIcon
          icon={faSignsPost}
          className="text-base text-[#5B5B60]"
        />
      </button>
      <LibSignDrawer showDrawer={open} setShowDrawer={closeDrawerHandler} />
    </>
  );
};

export default FloatingSignLibButton;
