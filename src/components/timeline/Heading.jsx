import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { json, useParams } from "react-router-dom";
import {
  getCurrentApplication,
  updateTimelineTitle,
} from "../../store/slices/application";
import { Button, Input } from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  FilePdfOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Document, usePDF } from "@react-pdf/renderer";
import ExternalTemplate from "../pdf/ExternalTemplate";
import InternalTemplate from "../pdf/InternalTemplate";
import { titleCase } from "../../tools/helper";
import addAnordnungAction from "../../store/slices/actionSubslices/addAnordnungAction";

const Heading = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const anordnung = useSelector(getCurrentApplication);
  const [title, setTitle] = useState(anordnung?.title);
  const [editTitle, setEditTitle] = useState(!!!anordnung?.title);
  const [instance, updateInstance] = usePDF({
    document:
      anordnung?.vzk_type?.name === "internal" ? (
        <InternalTemplate
          _timeline={anordnung?.vzk_anordnung_timelineArrayRelationShip}
          timeline={[]}
          title={anordnung?.title}
          requester={anordnung?.department}
          receiver={anordnung?.department_name}
          id={anordnung?.id}
        />
      ) : (
        <ExternalTemplate
          timeline={anordnung?.vzk_anordnung_timelineArrayRelationShip}
          title={anordnung?.title}
          id={anordnung?.id}
        />
      ),
  });

  const status = titleCase(anordnung?.vzk_status?.name);

  useEffect(() => {
    setTitle(anordnung?.title);
    setEditTitle(!!!anordnung?.title);
    updateInstance(
      anordnung?.vzk_type?.name === "internal" ? (
        <InternalTemplate
          timeline={anordnung?.vzk_anordnung_timelineArrayRelationShip}
          title={anordnung?.title}
          requester={anordnung?.department}
          receiver={anordnung?.department_name}
          id={anordnung?.id}
        />
      ) : (
        <ExternalTemplate
          timeline={anordnung?.vzk_anordnung_timelineArrayRelationShip}
          title={anordnung?.title}
          id={anordnung?.id}
        />
      )
    );
  }, [anordnung]);

  return (
    <div className="w-full flex justify-center mx-auto">
      <div
        className="flex flex-col w-full py-4 gap-4"
        // style={{ border: "1px solid yellow" }}
      >
        <div className="flex items-center justify-center gap-4">
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
                    addAnordnungAction({
                      className: "vzk_anordnung",
                      data: {
                        title: title,
                        uuid: anordnung?.uuid,
                      },
                    })
                  );
                  dispatch(
                    updateTimelineTitle({
                      updatedTitle: title,
                      applicationId: anordnung?.uuid,
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
              <div className="min-[1455px]:w-[800px]">
                <h1 className="my-0 text-4xl font-normal mb-4">
                  <span className="text-muted-foreground font-normal text-4xl">
                    #{anordnung?.id + " "}
                  </span>
                  {anordnung?.title}
                </h1>
                <div className="flex items-center gap-2">
                  <div
                    className={`${
                      status === "Offen" ? "bg-green-700" : "bg-purple-700"
                    } py-1 px-3 w-fit rounded-3xl text-lg font-medium text-white flex gap-2 items-center justify-center`}
                  >
                    {status === "Offen" ? (
                      <InfoCircleOutlined />
                    ) : (
                      <CheckCircleOutlined />
                    )}
                    <span>{status}</span>
                  </div>
                  <span className="text-muted-foreground font-normal">
                    Max Mustermann hat letzte Woche diese Anordnung erstellt ·{" "}
                    {anordnung?.vzk_anordnung_timelineArrayRelationShip?.length}{" "}
                    Baustein
                    {(anordnung?.vzk_anordnung_timelineArrayRelationShip
                      ?.length === 0 ||
                      anordnung?.vzk_anordnung_timelineArrayRelationShip
                        ?.length > 1) &&
                      "e"}
                  </span>
                </div>
              </div>
              <div className="min-[1455px]:w-[370px] flex flex-wrap min-[1020px]:flex-nowrap gap-2 justify-end">
                <Button
                  className="w-[133px]"
                  onClick={() => setEditTitle(true)}
                  icon={<EditOutlined />}
                >
                  Bearbeiten
                </Button>
                <Button
                  href={instance.url}
                  download={`${anordnung?.id}_Anordnung.pdf`}
                  icon={<FilePdfOutlined />}
                >
                  PDF Drucken
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Heading;
