import { Excalidraw, MainMenu, exportToCanvas } from "@excalidraw/excalidraw";
import { useEffect, useState, useRef } from "react";
import "./designer-style.css";
import { Divider } from "antd";
import { DeleteOutlined, CameraOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import TabsConnection from "./TabsConnection";
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

  useEffect(() => {
    if (excalidrawAPI) {
      if (viewOnlyMode) {
        getPreviewSrcLink(generatePreviewHandler());
      }
    }
  }, [excalidrawAPI]);

  function createExcalidrawImageElement(
    fileId,
    width,
    height,
    finalWidth,
    mimeType = "image/svg+xml",
    offsetX,
    offsetY
  ) {
    const currentWidth = mimeType === "image/svg+xml" ? finalWidth : 300;

    const centerX = offsetX
      ? offsetX
      : canvasWrapperRef.current.clientWidth / 2;
    const centerY = offsetY
      ? offsetY
      : canvasWrapperRef.current.clientHeight / 2;

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
      width: currentWidth,
      height: (currentWidth / width) * height,
      groupIds: [],
      boundElements: null,
      locked: false,
      link: null,
      fileId,
    };
    const excalidrawState = excalidrawAPI.getAppState();
    const getSceneElements = excalidrawAPI.getSceneElements();
    excalidrawAPI.updateScene({
      elements: [...getSceneElements, newElement],
      appState: excalidrawState,
    });
  }

  const fetchIcon = async (pathName, fileId) => {
    const res = await fetch(pathName);
    const img = new Image();
    img.src = pathName;

    img.onload = function () {
      createExcalidrawImageElement(
        fileId,
        this.naturalWidth,
        this.naturalHeight,
        70
      );
    };

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
    const newFileId = nanoid();
    await fetchIcon(pathName, newFileId);
  };

  const generatePreviewHandler = async (elements) => {
    let highestElement = 0;
    if (elements) {
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
    }
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
    event.stopPropagation();
    if (!viewOnlyMode) {
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      const fileId = nanoid();
      const file = event.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          createExcalidrawImageElement(
            fileId,
            img.naturalWidth,
            img.naturalHeight,
            70,
            file.type,
            offsetX,
            offsetY
          );
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
    }
  };

  return (
    <div>
      <TabsConnection
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
        onDropCapture={(event) => handleDrop(event)}
        onDragOver={handleDragOver}
      >
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
