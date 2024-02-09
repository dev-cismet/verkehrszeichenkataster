import SignsLibrary from "./SignsLibrary";

const libDrawerStyle = {
  position: "fixed",
  top: "0",
  right: "0",
  width: "384px",
  height: "100%",
  backgroundColor: "#fafafa",
  zIndex: "1000",
};

const LibSignDrawer = ({ showDrawer, setShowDrawer }) => {
  return (
    <>
      {showDrawer && (
        <div style={libDrawerStyle}>
          <SignsLibrary
            height="calc(100vh - 25px)"
            margins="1px"
            closeCallBack={setShowDrawer}
          />
        </div>
      )}
    </>
  );
};

export default LibSignDrawer;
