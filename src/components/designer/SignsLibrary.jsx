import { libraryExtractor } from "./libraryExtractor";
import signLocal from "./signLocal.json";
import { useEffect, useState } from "react";
import { Input, Collapse, Divider } from "antd";
import {
  CloseOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  BookOutlined,
  SearchOutlined,
  DeleteOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getTempSignsLibMode } from "../../store/slices/application";

const colorPrimary = "#6965db";
const colorInactiv = "#a5a5a5";
const colorTextBlack = "#1b1b1f";
const iconWrapperSize = {
  width: "28px",
  aspectRatio: "1/1",
  padding: "8px",
  boxSizing: "content-box",
  border: "1px solid #ECECF4",
  position: "relative",
};

const singleIconStyInternalStyle = {
  maxWidth: "38px",
  position: "absolute",
  maxHeight: "38px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
const iconWrapperSizeWithDescription = {
  flex: "0 0 28",
  minWidth: "28px",
  height: "28px",
  boxSizing: "content-box",
  padding: "8px",
  border: "1px solid #ECECF4",
  position: "relative",
};
const singleIconStyInternalStyleWithDescription = {
  maxWidth: "38px",
  position: "absolute",
  maxHeight: "38px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
const libraryTitle = {
  fontFamily: "Assistant, Helvetica, Roboto, Arial",
  fontSize: "20px",
  color: colorPrimary,
  fontWeight: "bold",
};
const sectionTitleStyle = {
  fontFamily: "Assistant, Helvetica, Roboto, Arial",
  fontSize: "15px",
  color: colorPrimary,
  fontWeight: "bold",
};

const titleGroupStyle = {
  fontFamily: "Assistant, Helvetica, Roboto, Arial",
  color: "#525252",
  lineHeight: "1.4em",
};

const onChangeCollapseHandle = (key) => {
  console.log(key);
};

const labelView = (group, groupItems = null) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      color: colorTextBlack,
    }}
  >
    <span style={titleGroupStyle}>{group.groupTitle}</span>
    <span style={{ fontSize: "12px", color: colorInactiv }}>
      {groupItems ? groupItems : group.iconsArr.length}
    </span>
  </div>
);

const SignsLibrary = ({
  dataIn: signLibrary = signLocal,
  extractor = libraryExtractor,
}) => {
  const [data, setData] = useState([]);
  const signLibMode = useSelector(getTempSignsLibMode);

  useEffect(() => {
    if (signLibrary) {
      setData(extractor(signLibrary));
    }
  }, [signLibrary]);
  const [showLibrary, setShowLibrary] = useState(true);
  const [onlyIconMode, setOnlyIconMode] = useState(true);
  const [itemsOnlyIcon, setItemsOnlyIcon] = useState();
  const [itemsWithTextDescription, setItemsWithTextDescription] = useState();
  const [isPinnedLibrary, setIsPinnedLibrary] = useState(true);

  const [searchText, setSearchText] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataOnlyIcon, setFilteredDataOnlyIcon] = useState({});
  const [filteredDataIconDescription, setFilteredDataIconDescription] =
    useState({});

  useEffect(() => {
    const compsWithTextDescription = {};
    const compsOnlyIcons = {};
    data.forEach((section) => {
      compsWithTextDescription[section.sectionTitle] = [];
      compsOnlyIcons[section.sectionTitle] = [];
      section.groups.forEach((g) => {
        const id = g.id;
        const label = labelView(g);
        const onlyIconObj = {
          id,
          label,
          children: onlyIconView(g.iconsArr),
        };
        compsOnlyIcons[section.sectionTitle].push(onlyIconObj);
        const iconWithDescriptionObj = {
          id,
          label,
          children: iconWithDescriptionView(g.iconsArr),
        };

        compsWithTextDescription[section.sectionTitle].push(
          iconWithDescriptionObj
        );
      });
    });

    setItemsOnlyIcon(compsOnlyIcons);
    setItemsWithTextDescription(compsWithTextDescription);
  }, [data]);

  useEffect(() => {
    if (searchText !== "") {
      const compsWithTextDescription = {};
      const compsOnlyIcons = {};

      data.forEach((section) => {
        compsWithTextDescription[section.sectionTitle] = [];
        compsOnlyIcons[section.sectionTitle] = [];

        if (
          !section.sectionTitle.toLowerCase().includes(searchText.toLowerCase())
        ) {
          section.groups.forEach((group) => {
            if (
              !group.groupTitle.toLowerCase().includes(searchText.toLowerCase())
            ) {
              const searchTermIcons = group.iconsArr.filter((icon) => {
                const idString = icon.id ? icon.id : "";
                return (
                  icon.iconsTitle
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                  idString.toLowerCase().includes(searchText.toLowerCase())
                );
              });

              if (searchTermIcons.length !== 0) {
                const id = group.id;
                const label = labelView(group, searchTermIcons.length);
                const onlyIconObj = {
                  id,
                  label,
                  children: onlyIconView(searchTermIcons),
                };
                compsOnlyIcons[section.sectionTitle].push(onlyIconObj);

                const iconWithDescriptionObj = {
                  id,
                  label,
                  children: iconWithDescriptionView(searchTermIcons),
                };

                compsWithTextDescription[section.sectionTitle].push(
                  iconWithDescriptionObj
                );
              }
            } else {
              const id = group.id;
              const label = labelView(group);
              const onlyIconObj = {
                id,
                label,
                children: onlyIconView(group.iconsArr),
              };
              compsOnlyIcons[section.sectionTitle].push(onlyIconObj);
              const iconWithDescriptionObj = {
                id,
                label,
                children: iconWithDescriptionView(group.iconsArr),
              };
              compsWithTextDescription[section.sectionTitle].push(
                iconWithDescriptionObj
              );
            }
          });
        } else {
          compsWithTextDescription[section.sectionTitle] = [];
          compsOnlyIcons[section.sectionTitle] = [];
          section.groups.forEach((g) => {
            const id = g.id;
            const label = labelView(g);
            const onlyIconObj = {
              id,
              label,
              children: onlyIconView(g.iconsArr),
            };
            compsOnlyIcons[section.sectionTitle].push(onlyIconObj);
            const iconWithDescriptionObj = {
              id,
              label,
              children: iconWithDescriptionView(g.iconsArr),
            };

            compsWithTextDescription[section.sectionTitle].push(
              iconWithDescriptionObj
            );
          });
        }
      });

      const dataFiltered = Object.keys(compsOnlyIcons).filter(
        (sectionName) => compsOnlyIcons[sectionName].length > 0
      );

      setFilteredData(dataFiltered);
      setFilteredDataOnlyIcon(compsOnlyIcons);
      setFilteredDataIconDescription(compsWithTextDescription);
    }
  }, [searchText]);

  const onlyIconView = (iconsData) => {
    return (
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginRight: "-18px",
        }}
      >
        {iconsData.map((icon) => (
          <div key={icon.iconId} style={iconWrapperSize}>
            <img
              src={icon.fileName}
              style={singleIconStyInternalStyle}
              //   onClick={handleUpdateCanvas}
            />
          </div>
        ))}
      </div>
    );
  };

  const iconWithDescriptionView = (iconsData) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          color: colorTextBlack,
        }}
      >
        {iconsData.map((icon) => (
          <div
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
            key={icon.iconId}
          >
            <div style={iconWrapperSizeWithDescription}>
              <img
                src={icon.fileName}
                style={singleIconStyInternalStyleWithDescription}
                // onClick={handleUpdateCanvas}
              />
            </div>
            <span style={{ fontSize: "13px", lineHeight: "1.3em" }}>
              {icon.iconsTitle}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {showLibrary ? (
        <div
          style={{
            margin: "15px 0 12px 4px",
            width: "338px",
            border: "1px solid #F0F0F0",
            padding: "10px 20px",
            boxShadow: "rgba(15, 14, 15, 0.07) 4px 1px 9px 1px",
            borderRadius: "12px",
            overflow: "auto",
            _height: "650px",
            height: signLibMode === "detached" ? "calc(100vh - 52px)" : "650px",
            color: "#1b1b1f",
            boxSizing: "content-box",
          }}
        >
          <div style={{ margin: "16px 0" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={libraryTitle}>Bibliothek</span>
              <div style={{ marginLeft: "auto" }}>
                {/* <PushpinOutlined
                      style={{
                        color: "#a5a5a5",
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginRight: "12px",
                      }}
                      onClick={() => setIsPinnedLibrary(false)}
                    /> */}
                <AppstoreOutlined
                  style={{
                    color: !onlyIconMode && colorInactiv,
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    setOnlyIconMode(true);
                  }}
                />

                <UnorderedListOutlined
                  onClick={() => {
                    setOnlyIconMode(false);
                  }}
                  style={{
                    color: onlyIconMode && colorInactiv,
                    marginRight: "10px",
                  }}
                />

                <CloseOutlined
                  onClick={() => setShowLibrary(!showLibrary)}
                  style={{
                    // color: colorPrimary,
                    fontSize: "16px",
                    fontWeight: "medium",
                    color: "#1b1b1f",
                  }}
                />
              </div>
            </div>
            <Divider style={{ margin: "22px 0px" }} />
            <div style={{ margin: "15px 0px" }}>
              {/* <span style={libraryTitle}>Suche</span> */}
              <Input
                size="large"
                prefix={<SearchOutlined />}
                allowClear
                onPressEnter={(e) => {
                  setSearchText(e.target.value);
                }}
                placeholder="Hier nach Beschreibung und Nr filtern"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{
                  height: "40px",
                  marginTop: "8px",
                  marginBottom: "15px",
                  fontSize: "14px",
                }}
              />
              {searchText === ""
                ? data.map((section) => {
                    return (
                      <div
                        style={{ margin: "12px 0px 0px 0px" }}
                        key={section.sectionTitle}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "6px",
                          }}
                        >
                          <span style={sectionTitleStyle}>
                            {section.sectionTitle}
                          </span>
                        </div>
                        <Collapse
                          items={
                            onlyIconMode
                              ? itemsOnlyIcon[section.sectionTitle]
                              : itemsWithTextDescription[section.sectionTitle]
                          }
                          ghost
                          defaultActiveKey={["1"]}
                          _onChange={onChangeCollapseHandle}
                        />
                      </div>
                    );
                  })
                : filteredData.map((sectionTitle) => {
                    return (
                      <div
                        style={{ margin: "12px 0px 0px 0px" }}
                        key={sectionTitle}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "6px",
                          }}
                        >
                          <span style={sectionTitleStyle}>{sectionTitle}</span>
                        </div>
                        <Collapse
                          items={
                            onlyIconMode
                              ? filteredDataOnlyIcon[sectionTitle] || []
                              : filteredDataIconDescription[sectionTitle || []]
                          }
                          ghost
                          defaultActiveKey={["1"]}
                          _onChange={onChangeCollapseHandle}
                        />
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SignsLibrary;
