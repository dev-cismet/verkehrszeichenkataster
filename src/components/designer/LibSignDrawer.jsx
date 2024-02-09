import SignsLibrary from "./SignsLibrary";
import TempSignsLibMock from "./TempSignsLibMock";

const libDrawerStyle = {
  position: "fixed",
  top: "0",
  right: "0",
  width: "390px",
  height: "100%",
  backgroundColor: "#f0f0f0",
  zIndex: "1000",
  padding: "20px 20px 20px 20px",
};

const LibSignDrawer = ({ showDrawer }) => {
  return (
    <>
      {showDrawer && (
        <div style={libDrawerStyle}>
          <SignsLibrary height="100vh" />
        </div>
      )}
    </>
  );
};

export default LibSignDrawer;
