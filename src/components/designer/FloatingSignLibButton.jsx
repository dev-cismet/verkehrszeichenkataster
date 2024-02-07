import { useState } from "react";
import LibSignDrawer from "./LibSignDrawer";

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
  return (
    <>
      <button onClick={() => setOpen(!open)} style={floatingBtnStyle}>
        +
      </button>
      <LibSignDrawer showDrawer={open} />
    </>
  );
};

export default FloatingSignLibButton;
