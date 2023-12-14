import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCurrentApplication,
  updateTimelineTitle,
} from "../../store/slices/application";
import { Button, Input } from "antd";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";

const Heading = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const anordnung = useSelector(getCurrentApplication);
  const [title, setTitle] = useState(anordnung.timelineTitle);
  const [editTitle, setEditTitle] = useState(!!!anordnung.timelineTitle);

  useEffect(() => {
    setTitle(anordnung.timelineTitle);
    setEditTitle(!!!anordnung.timelineTitle);
  }, [anordnung]);

  return (
    <div className="w-3/4 mx-auto flex items-center gap-2">
      <div className="flex flex-col w-full py-4 gap-2">
        <div className="flex items-center justify-between gap-4">
          {editTitle ? (
            <>
              <Input
                className="w-full py-[4.5px]"
                size="large"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
              <Button
                onClick={() => {
                  dispatch(
                    updateTimelineTitle({
                      updatedTitle: title,
                      applicationId: id,
                    })
                  );
                  setEditTitle(false);
                }}
              >
                Speichern
              </Button>

              <Button
                type="text"
                className="text-primary font-medium"
                onClick={() => setEditTitle(false)}
              >
                Abbrechen
              </Button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 w-full">
                <h1 className="my-0 text-4xl">{anordnung.timelineTitle}</h1>
                <span className="text-muted-foreground font-normal text-4xl">
                  #{anordnung.id}
                </span>
              </div>
              <Button onClick={() => setEditTitle(true)}>Bearbeiten</Button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`${
              anordnung.timelineStatus === "Offen"
                ? "bg-green-600"
                : "bg-purple-600"
            } py-1 px-3 w-fit rounded-2xl text-lg font-medium text-white flex gap-2 items-center justify-center`}
          >
            {anordnung.timelineStatus === "Offen" ? (
              <InfoCircleOutlined />
            ) : (
              <CheckCircleOutlined />
            )}
            <span>{anordnung.timelineStatus}</span>
          </div>
          <span className="text-muted-foreground font-normal">
            Person hat letzte Woche diese Anordnung erstellt ·{" "}
            {anordnung?.timeline?.length} Baustein
            {(anordnung?.timeline?.length === 0 ||
              anordnung?.timeline?.length > 1) &&
              "e"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Heading;
