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
            height="calc(100vh)"
            margins="1px"
            iconsGap="12px"
            closeCallBack={setShowDrawer}
          />
        </div>
      )}
    </>
  );
};

export default LibSignDrawer;
