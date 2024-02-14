import { Excalidraw, MainMenu, exportToCanvas } from "@excalidraw/excalidraw";
import { useEffect, useState, useRef } from "react";
import "./designer-style.css";
import { Divider } from "antd";
import { DeleteOutlined, CameraOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import TempTabsConnection from "./TempTabsConnection";
import LibraryRoadSignsButton from "./LibraryRoadSignsButton";
import SignsLibrary from "./SignsLibrary";

const DesignerWrapper = ({
  viewOnlyMode = false,
  getElements = (elements) => {},
  getFiles = () => {},
  initialElements,
  getPreviewSrcLink = () => {},
  resetDrawing = 1,
  // displayLibrary = false,
}) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const canvasWrapperRef = useRef(null);
  const canvasWidthRef = useRef(null);
  const [canvasUrl, setCanvasUrl] = useState(null);
  const [currentId, setCurrentId] = useState(nanoid());
  const [currentMode, setCurrentMode] = useState(nanoid());
  const [signPath, setSignPath] = useState(null);

  const [isDragging, setIsdragging] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [image, setImage] = useState(null);
  const [currentImageSizes, setCurrentImageSizes] = useState(null);

  useEffect(() => {
    if (excalidrawAPI) {
      if (viewOnlyMode) {
        getPreviewSrcLink(generatePreviewHandler());
      }
    }
  }, [excalidrawAPI]);

  const fetchIcon = async (pathName, fileId) => {
    const res = await fetch(pathName);

    const imageData = await res.blob();
    const reader = new FileReader();
    reader.readAsDataURL(imageData);

    reader.onload = function () {
      const imagesArray = [
        {
          id: fileId,
          dataURL: reader.result,
          mimeType: "image/svg+xml",
        },
      ];
      excalidrawAPI.addFiles(imagesArray);
    };
  };
  const UIOptions = {
    canvasActions: {
      saveAsImage: false,
    },
  };

  const handleUpdateCanvas = async (pathName) => {
    // const naturalWidth = event.target.naturalWidth;
    // const naturalHeight = event.target.naturalHeight;
    // const iconPath = event.target.getAttribute("src");
    // const pathName = iconPath;
    const newFileId = nanoid();

    const excalidrawState = excalidrawAPI.getAppState();

    const centerX = canvasWrapperRef.current.clientWidth / 2;
    const centerY = canvasWrapperRef.current.clientHeight / 2;

    const newElement = {
      type: "image",
      isDeleted: false,
      id: nanoid(),
      fillStyle: "hachure",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      angle: 0,
      x: centerX,
      y: centerY,
      strokeColor: "#c92a2a",
      backgroundColor: "transparent",
      width: 150,
      height: 150,
      groupIds: [],
      boundElements: null,
      locked: false,
      link: null,
      fileId: newFileId,
    };

    const getSceneElements = excalidrawAPI.getSceneElements();

    excalidrawAPI.updateScene({
      elements: [...getSceneElements, newElement],
      appState: excalidrawState,
    });
    await fetchIcon(pathName, newFileId);
  };

  const generatePreviewHandler = async (elements) => {
    let highestElement = 0;
    elements.forEach((el) => {
      if (el.height > highestElement) {
        highestElement = el.height;
      }
    });
    const exportCanvas = await exportToCanvas({
      elements: excalidrawAPI.getSceneElements(),
      appState: excalidrawAPI.getAppState(),
      getDimensions: () => {
        return {
          width: canvasWidthRef.current.clientWidth - 20,
          _height: canvasWrapperRef.current.clientHeight,
          height: highestElement,
        };
      },
      files: excalidrawAPI.getFiles(),
      exportPadding: 0,
    });
    setCanvasUrl(exportCanvas.toDataURL());
    getPreviewSrcLink(exportCanvas.toDataURL());
  };

  useEffect(() => {
    if (!viewOnlyMode && signPath) {
      handleUpdateCanvas(signPath);
    }
  }, [signPath]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    setPosition({ x: offsetX, y: offsetY });

    console.log("xxx drop");

    const fileId = nanoid();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage({ id: fileId, mimeType: file.type });

      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        setCurrentImageSizes({ width: img.width, height: img.height });
      };

      const imagesArray = [
        {
          id: fileId,
          dataURL: reader.result,
          mimeType: file.type,
        },
      ];
      excalidrawAPI.addFiles(imagesArray);
    };
    reader.readAsDataURL(file);
  };

  const handleSize = (fileId, sizes) => {
    const excalidrawState = excalidrawAPI.getAppState();

    const centerX = canvasWrapperRef.current.clientWidth / 2;
    const centerY = canvasWrapperRef.current.clientHeight / 2;

    const newElement = {
      type: "image",
      isDeleted: false,
      id: nanoid(),
      fillStyle: "hachure",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      angle: 0,
      x: position.x - 20,
      y: position.y - 20,
      // x: centerX,
      // y: centerY,
      strokeColor: "#c92a2a",
      backgroundColor: "transparent",
      width: sizes.width / 14,
      height: sizes.height / 14,
      groupIds: [],
      boundElements: null,
      locked: false,
      link: null,
      fileId: fileId,
    };

    const getSceneElements = excalidrawAPI.getSceneElements();

    excalidrawAPI.updateScene({
      elements: [...getSceneElements, newElement],
      appState: excalidrawState,
    });

    setCurrentImageSizes(null);

    setImage(null);
  };

  useEffect(() => {
    if (image && currentImageSizes) {
      handleSize(image.id, currentImageSizes);
    }
  }, [image, currentImageSizes]);

  return (
    <div>
      <TempTabsConnection
        key={currentMode + currentId}
        channelId={currentId}
        addImage={setSignPath}
      />
      <div
        ref={canvasWidthRef}
        className={`excalidraw-custom-wrapper ${
          viewOnlyMode ? "only-view-mode" : ""
        }`}
        style={{
          height: "700px",
          display: "flex",
          position: "relative",
        }}
        onDrop={(event) => handleDrop(event)}
        onDragOver={handleDragOver}
        onMouseLeave={() => setIsdragging(true)}
        onMouseEnter={() => setIsdragging(false)}
      >
        {isDragging && !viewOnlyMode && (
          <div
            style={{
              top: 0,
              center: "0",
              height: "100%",
              width: "100%",
              position: "absolute",
              background: "red",
              zIndex: 9999,
              opacity: "0.1",
            }}
          ></div>
        )}
        <div className="w-full" ref={canvasWrapperRef}>
          <Excalidraw
            excalidrawAPI={(api) => setExcalidrawAPI(api)}
            UIOptions={UIOptions}
            onChange={(elements, appstate, files) => {
              getElements(elements);
              getFiles(files);
              generatePreviewHandler(elements);
            }}
            initialData={initialElements}
            langCode="de-DE"
            viewModeEnabled={viewOnlyMode}
            zenModeEnabled={viewOnlyMode}
            renderTopRightUI={() => (
              <LibraryRoadSignsButton
                key={currentMode + currentId}
                connectionId={currentId}
                setCurrentMode={setCurrentMode}
                setIsdragging={setIsdragging}
              />
            )}
          >
            <MainMenu style={{ width: "500px" }}>
              <MainMenu.DefaultItems.Export />
              <MainMenu.Item
                onSelect={generatePreviewHandler}
                icon={
                  <CameraOutlined
                    style={{ fontSize: "8px", color: "#5B5B60" }}
                  />
                }
              >
                <span>Vorschau erstellen</span>
              </MainMenu.Item>
              {!viewOnlyMode && (
                <>
                  <MainMenu.DefaultItems.Help />
                  <MainMenu.DefaultItems.LoadScene />
                  <MainMenu.Item
                    onSelect={() => {
                      excalidrawAPI.resetScene();
                    }}
                    icon={
                      <DeleteOutlined
                        style={{ fontSize: "8px", color: "#5B5B60" }}
                      />
                    }
                  >
                    <span>Zeichenfläche löschen</span>
                  </MainMenu.Item>
                  <Divider />
                </>
              )}
              <MainMenu.DefaultItems.ChangeCanvasBackground />
            </MainMenu>
          </Excalidraw>
        </div>
        {currentMode === "inside" && !viewOnlyMode ? (
          <div style={{ width: "320px" }}>
            <SignsLibrary
              height="650px"
              iconSize="40px"
              closeCallBack={() => setCurrentMode("none")}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DesignerWrapper;
