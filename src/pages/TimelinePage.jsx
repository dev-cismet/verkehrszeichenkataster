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
import { useEffect, useState } from "react";
import { titleCase } from "../tools/helper";
import addAnordnungAction from "../store/slices/actionSubslices/addAnordnungAction";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "@reduxjs/toolkit";

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
  const anordnung = useSelector(getCurrentApplication);

  const currentTimeline = anordnung?.vzk_anordnung_timelineArrayRelationShip;
  const isInternalRequest = anordnung?.vzk_type?.name === "internal";
  const status = titleCase(anordnung?.vzk_status?.name);

  const dispatch = useDispatch();

  const changeTimeline = (item) => {
    dispatch(storeTimeline({ id: id, timeline: [...currentTimeline, item] }));
    setTimeout(() => {
      document
        .getElementById(currentTimeline.length.toString())
        ?.scrollIntoView({ behavior: "smooth" });
    }, 5);
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

  return (
    <Card
      bodyStyle={{
        overflowY: "auto",
        overflowX: "clip",
        maxHeight: "91%",
        height: "100%",
        marginTop: "2px",
      }}
      className="h-full w-full"
      title={
        <div style={{ whiteSpace: "wrap" }}>
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
      <div className="h-full w-[100%] min-[1260px]:w-[87%] min-[1440px]:w-[76%] mx-auto flex flex-col min-[965px]:flex-row gap-4 justify-between">
        <div className="flex flex-col w-full">
          {currentTimeline?.map((attachment, i) => {
            switch (attachment.vzk_attachment_typ?.name?.toLowerCase()) {
              case "request":
                return (
                  <Request
                    attachment={attachment}
                    key={i}
                    i={i}
                    isInternalRequest={isInternalRequest}
                  />
                );
              case "text":
                return <Text attachment={attachment} id={i} key={i} />;
              case "decision":
                return <Decision key={i} id={i} attachment={attachment} />;
              case "file":
                return <File key={i} attachment={attachment} i={i} />;
              case "drawing":
                return (
                  <DrawingCard
                    key={i}
                    attachment={attachment}
                    id={i}
                    changeTimeline={changeTimeline}
                  />
                );
            }
          })}
          <hr className="w-full border-t-[1px] border-solid border-zinc-200 my-0" />
          <SubmitCard changeTimeline={changeTimeline} handleDrop={handleDrop} />
        </div>

        <div className="w-[370px]" style={{ minWidth: "370px" }}>
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
          </div>
        </div>
      </div>
      {/* </Dragger> */}
    </Card>
  );
};

export default TimelinePage;
