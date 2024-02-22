import { Card, Upload } from "antd";
import Timeline from "../components/application/Timeline";
import Request from "../components/timeline/Request";
import Text from "../components/timeline/Text";
import Decision from "../components/timeline/Decision";
import "./dragger.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentApplication,
  storeTimeline,
  updateTimelineStatus,
} from "../store/slices/application";
import File from "../components/timeline/File";
import { useParams } from "react-router-dom";
import SubmitCard from "../components/timeline/SubmitCard";
import Heading from "../components/timeline/Heading";
import TagList from "../components/timeline/TagList";
import DrawingCard from "../components/timeline/DrawingCard";
import {
  CloseOutlined,
  HistoryOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { titleCase } from "../tools/helper";
import addAnordnungAction from "../store/slices/actionSubslices/addAnordnungAction";
import { v4 as uuidv4 } from "uuid";
import FloatingSignLibButton from "../components/designer/FloatingSignLibButton";
import LibSignDrawer from "../components/designer/LibSignDrawer";
import SignsLibrary from "../components/designer/SignsLibrary";
import { getSignsLibMode } from "../store/slices/signsLibrary";

const { Dragger } = Upload;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const TimelinePage = () => {
  const { id } = useParams();
  const headingRef = useRef(null);
  const anordnung = useSelector(getCurrentApplication);
  const signLibMode = useSelector(getSignsLibMode);
  const containerRef = useRef(null);

  const [containerHeight, setContainerHeight] = useState(800);
  const [headingHeight, setHeadingHeight] = useState(144);
  const [newTextIndex, setNewTextIndex] = useState(-1);

  const currentTimeline = anordnung?.vzk_anordnung_timelineArrayRelationShip;
  const isInternalRequest = anordnung?.vzk_type?.name === "internal";
  const status = titleCase(anordnung?.vzk_status?.name);

  const dispatch = useDispatch();
  const changeTimeline = (item) => {
    setNewTextIndex(-1);
    dispatch(storeTimeline({ id: id, timeline: [...currentTimeline, item] }));
    setTimeout(() => {
      document
        .getElementById(currentTimeline.length.toString())
        ?.scrollIntoView({ behavior: "smooth" });
    }, 5);

    if (item.vzk_attachment_typ.id === 2 && !item.data.text) {
      setNewTextIndex(currentTimeline.length);
    }
  };

  const handleDrop = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file);
    }

    const uuid = uuidv4();
    const timelineObjectId = uuidv4();

    dispatch(
      addAnordnungAction({
        className: "vzk_attachment_file",
        data: {
          file: file.url || file.preview,
          uuid: uuid,
          description: "",
        },
      })
    );
    dispatch(
      addAnordnungAction({
        className: "vzk_anordnung",
        data: {
          uuid: id,
          vzk_anordnung_timelineArrayRelationShip: [
            ...anordnung.vzk_anordnung_timelineArrayRelationShip,
            {
              name: file.name.replace(/\.[^/.]+$/, ""),
              fk_uuid: uuid,
              uuid: timelineObjectId,
              vzk_attachment_typ: {
                id: 4,
                name: "File",
              },
            },
          ],
        },
      })
    );

    changeTimeline({
      vzk_attachment_typ: {
        id: 4,
        name: "File",
      },
      fk_uuid: uuid,
      uuid: timelineObjectId,
      name: file.name.replace(/\.[^/.]+$/, ""),
      data: {
        file: file.url || file.preview,
      },
    });
  };

  useEffect(() => {
    const getContainerScrollHeight = () => {
      const visibleHeight = window.innerHeight;
      if (containerRef.current) {
        const scrollHeight = containerRef.current.scrollHeight;
        setContainerHeight(scrollHeight + visibleHeight);
      }
    };

    getContainerScrollHeight();
  }, [containerRef.current]);

  if (headingRef.current) {
    if (headingHeight !== headingRef.current.offsetHeight) {
      setHeadingHeight(headingRef.current.offsetHeight);
    }
  }

  return (
    <Card
      ref={containerRef}
      bodyStyle={{
        overflowY: "auto",
        overflowX: "clip",
        maxHeight: `calc(100% - ${headingHeight + 6}px)`,
        height: "100%",
        marginTop: "2px",
      }}
      className="h-full w-full"
      title={
        <div ref={headingRef} style={{ whiteSpace: "wrap" }}>
          <Heading />
        </div>
      }
    >
      {/* <Dragger
      openFileDialogOnClick={false}
      className="h-full w-full"
      beforeUpload={(file) => {
        handleDrop(file);
      }}
      fileList={[]}
    > */}
      <div
        className="flex mx-auto justify-center"
        // style={{ height: `${containerHeight}px`, border: "1px solid red" }}
      >
        <div className="flex flex-col min-[1020px]:flex-row justify-between gap-4">
          <div className="flex flex-col min-[1455px]:w-[800px]">
            {currentTimeline?.map((attachment, i) => {
              switch (attachment.vzk_attachment_typ?.name?.toLowerCase()) {
                case "request":
                  return (
                    <Request
                      attachment={attachment}
                      key={attachment?.uuid}
                      index={i}
                      isInternalRequest={isInternalRequest}
                    />
                  );
                case "text":
                  return (
                    <Text
                      attachment={attachment}
                      index={i}
                      key={attachment?.uuid}
                      isNewText={i === newTextIndex}
                    />
                  );
                case "decision":
                  return (
                    <Decision
                      key={attachment?.uuid}
                      id={i}
                      attachment={attachment}
                    />
                  );
                case "file":
                  return (
                    <File
                      key={attachment?.uuid}
                      attachment={attachment}
                      index={i}
                    />
                  );
                case "drawing":
                  return (
                    <DrawingCard
                      key={attachment?.uuid}
                      attachment={attachment}
                      index={i}
                    />
                  );
              }
            })}
            <hr className="w-full border-t-[1px] border-solid border-zinc-200 my-0" />
            <SubmitCard
              changeTimeline={changeTimeline}
              handleDrop={handleDrop}
            />
          </div>

          <div className="min-[1455px]:w-[370px]">
            <div className="flex flex-col w-full items-start">
              <span className="font-semibold text-muted-foreground pb-2">
                Zeitlicher Verlauf
              </span>
              <Timeline dataIn={currentTimeline} />
              <hr className="w-full border-t-[1px] border-solid border-zinc-200 my-4" />
              <TagList changeTimeline={changeTimeline} />
              <hr className="w-full border-t-[1px] border-solid border-zinc-200 my-4" />
              <span className="font-semibold text-muted-foreground pb-2">
                Bearbeitung
              </span>
              <div
                role="button"
                className="hover:text-primary flex gap-1 cursor-pointer font-medium"
                onClick={() => {
                  dispatch(
                    addAnordnungAction({
                      className: "vzk_anordnung",
                      data: {
                        vzk_status:
                          status === "Offen"
                            ? {
                                id: 2,
                                name: "geschlossen",
                              }
                            : {
                                id: 1,
                                name: "offen",
                              },
                        uuid: anordnung.uuid,
                      },
                    })
                  );
                  dispatch(
                    updateTimelineStatus({
                      updatedStatus:
                        status === "Offen"
                          ? {
                              id: 2,
                              name: "geschlossen",
                            }
                          : {
                              id: 1,
                              name: "offen",
                            },
                    })
                  );
                }}
              >
                {status === "Offen" ? <LockOutlined /> : <UnlockOutlined />}
                <span>
                  {status === "Offen" ? "Abschließen" : "Wieder eröffnen"}
                </span>
              </div>
              {signLibMode === "timeline" && (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: containerHeight,
                  }}
                >
                  <div style={{ position: "sticky", top: 0 }}>
                    <SignsLibrary
                      // iconsGap="8px"
                      iconsGap="8px"
                      iconSize="40px"
                      margins="20px 0 0 0"
                      height="650px"
                    />
                  </div>
                </div>
              )}
              {signLibMode === "overlay" && (
                <>
                  <FloatingSignLibButton /> <LibSignDrawer />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* </Dragger> */}
    </Card>
  );
};

export default TimelinePage;
