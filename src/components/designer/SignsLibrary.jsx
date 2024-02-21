import { libraryExtractor } from "./libraryExtractor";
import signLocal from "./signLocal.json";
import { useEffect, useState } from "react";
import { Input, Collapse, Divider } from "antd";
import {
  storeSignsLibMode,
  storeSignsLibIconClicked,
} from "../../store/slices/signsLibrary.js";
import { useDispatch } from "react-redux";
import {
  CloseOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { BroadcastChannel } from "broadcast-channel";
import { useSearchParams } from "react-router-dom";
import {
  colorPrimary,
  colorInactiv,
  colorTextBlack,
  iconWrapperSize,
  iconWrapperSizeWithDescription,
  singleIconStyInternalStyleWithDescription,
  libraryTitle,
  sectionTitleStyle,
  titleGroupStyle,
} from "./signs-style.js";
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
  height = "100%",
  margins = "0",
  closeCallBack,
  width = "100%",
  iconsGap = "14px",
  iconSize = "70px",
}) => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState(null);
  const dispatch = useDispatch();
  const [urlParams, setUrlParams] = useSearchParams();
  useEffect(() => {
    const channelParam = urlParams.get("channel");
    if (channelParam) {
      const newChannel = new BroadcastChannel(urlParams.get("channel"));

      const handleMessage = (newMessage) => {
        setMessage(newMessage);

        if (newMessage === "close") {
          window.close();
        }
      };

      newChannel.addEventListener("message", handleMessage);
      setChannel(newChannel);

      return () => {
        newChannel.close();
        newChannel.removeEventListener("message", handleMessage);
      };
    }
  }, []);

  const singleIconStyInternalStyle = {
    maxWidth: iconSize,
    position: "absolute",
    maxHeight: iconSize,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
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

  const sendMessage = (path) => {
    if (channel) {
      channel.postMessage(path);
    }
  };
  const closeMessage = () => {
    if (channel) {
      channel.postMessage("close");
    }
  };

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
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(calc(${iconSize} + 8px), 0.75fr))`,
          gridGap: iconsGap,
        }}
      >
        {iconsData.map((icon) => (
          <div key={icon.iconId} style={iconWrapperSize}>
            <img
              src={icon.fileName}
              style={singleIconStyInternalStyle}
              onClick={() => {
                const channelParam = urlParams.get("channel");
                if (channelParam) {
                  sendMessage(icon.fileName);
                } else {
                  dispatch(storeSignsLibIconClicked(icon.fileName));
                }
              }}
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
                onClick={() => {
                  const channelParam = urlParams.get("channel");
                  if (channelParam) {
                    sendMessage(icon.fileName);
                  } else {
                    dispatch(storeSignsLibIconClicked(icon.fileName));
                  }
                }}
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
            margin: margins,
            width,
            border: "1px solid #F0F0F0",
            padding: "10px 20px",
            boxShadow: "rgba(15, 14, 15, 0.07) 4px 1px 9px 1px",
            borderRadius: "12px",
            overflow: "auto",
            height,
            background: "#ffff",
            color: "#1b1b1f",
          }}
        >
          <div style={{ margin: "16px 0" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={libraryTitle}>Bibliothek {message}</span>
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
                  onClick={() => {
                    if (urlParams.get("channel")) {
                      window.close();
                    }
                    closeCallBack
                      ? closeCallBack()
                      : dispatch(storeSignsLibMode("none"));
                  }}
                  style={{
                    fontSize: "16px",
                    fontWeight: "medium",
                    color: "#1b1b1f",
                  }}
                />
              </div>
            </div>
            <Divider style={{ margin: "22px 0px" }} />
            <div style={{ margin: "15px 0px" }}>
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
