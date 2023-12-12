import { Button, Input } from "antd";
import AttachmentWrapper, { AttachmentRow } from "./AttachmentWrapper";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateTimelineValues } from "../../store/slices/application";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const Request = ({ attachment, i }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isInternalRequest, setIsInternalRequest] = useState(false);
  const [requester, setRequester] = useState("");
  const [receiver, setReceiver] = useState("");

  const updateValue = (value, property) => {
    dispatch(
      updateTimelineValues({
        timelineIndex: i,
        itemValue: value,
        property: property,
        applicationId: id,
      })
    );
  };

  return (
    <AttachmentWrapper>
      <Button onClick={() => setIsInternalRequest(!isInternalRequest)}>
        Switch
      </Button>
      {isInternalRequest ? (
        <>
          <AttachmentRow name="Absender">
            {requester ? (
              <span className="w-full">
                {requester}{" "}
                <EditOutlined
                  className="cursor-pointer"
                  onClick={() => setRequester("")}
                />
              </span>
            ) : (
              <div className="flex justify-center items-center gap-2 w-full">
                <Button onClick={() => setRequester("104.11")}>104.11</Button>
                <Button onClick={() => setRequester("104.23")}>104.23</Button>
                <Button onClick={() => setRequester("GMW")}>GMW</Button>
              </div>
            )}
          </AttachmentRow>
          <AttachmentRow name="Empfänger">
            {receiver ? (
              <span className="w-full">
                {receiver}{" "}
                <EditOutlined
                  className="cursor-pointer"
                  onClick={() => setReceiver("")}
                />
              </span>
            ) : (
              <div className="flex justify-center items-center gap-2 w-full">
                <Button onClick={() => setReceiver("104.11")}>104.11</Button>
                <Button onClick={() => setReceiver("104.23")}>104.23</Button>
                <Button onClick={() => setReceiver("GMW")}>GMW</Button>
              </div>
            )}
          </AttachmentRow>
        </>
      ) : (
        <>
          <div className="flex">
            <div className="w-[22%]" />
            <div className="w-full flex items-center justify-center gap-2">
              <h4 className="mb-0">Antragssteller</h4>
            </div>
          </div>

          <AttachmentRow name="Stadt">
            <Input
              value={attachment?.requester_city}
              onChange={(e) => {
                updateValue(e.target.value, "requester_city");
              }}
            />
          </AttachmentRow>
          <AttachmentRow name="Postleitzahl">
            <Input
              value={attachment?.requester_postalcode}
              onChange={(e) => {
                updateValue(e.target.value, "requester_postalcode");
              }}
            />
          </AttachmentRow>
          <AttachmentRow name="Straße">
            <Input
              value={attachment?.requester_street}
              onChange={(e) => {
                updateValue(e.target.value, "requester_street");
              }}
            />
          </AttachmentRow>
          <AttachmentRow name="Hausnummer">
            <Input
              value={attachment?.requester_street_number}
              onChange={(e) => {
                updateValue(e.target.value, "requester_street_number");
              }}
            />
          </AttachmentRow>

          <div className="flex">
            <div className="w-[22%]" />
            <div className="w-full flex items-center justify-center gap-2">
              <h4 className="mb-0">Rechnungsadresse</h4>
            </div>
          </div>
          <AttachmentRow name="Stadt">
            <Input
              value={attachment?.billing_city}
              onChange={(e) => {
                updateValue(e.target.value, "billing_city");
              }}
            />
          </AttachmentRow>
          <AttachmentRow name="Postleitzahl">
            <Input
              value={attachment?.billing_postal_code}
              onChange={(e) => {
                updateValue(e.target.value, "billing_postal_code");
              }}
            />
          </AttachmentRow>
          <AttachmentRow name="Straße">
            <Input
              value={attachment?.billing_street}
              onChange={(e) => {
                updateValue(e.target.value, "billing_street");
              }}
            />
          </AttachmentRow>
          <AttachmentRow name="Hausnummer">
            <Input
              value={attachment?.billing_street_number}
              onChange={(e) => {
                updateValue(e.target.value, "billing_street_number");
              }}
            />
          </AttachmentRow>

          <div className="flex">
            <div className="w-[22%]" />
            <h4 className="w-full">Weiteres</h4>
          </div>
          <AttachmentRow name="Vorname">
            <Input
              value={attachment?.firstname}
              onChange={(e) => {
                updateValue(e.target.value, "firstname");
              }}
            />
          </AttachmentRow>
          <AttachmentRow name="Nachname">
            <Input
              value={attachment?.lastname}
              onChange={(e) => {
                updateValue(e.target.value, "lastname");
              }}
            />
          </AttachmentRow>
          <AttachmentRow name="Telefonnummer">
            <Input
              value={attachment?.phone}
              onChange={(e) => {
                updateValue(e.target.value, "phone");
              }}
            />
          </AttachmentRow>
          <AttachmentRow name="E-Mail">
            <Input
              value={attachment?.email}
              onChange={(e) => {
                updateValue(e.target.value, "email");
              }}
            />
          </AttachmentRow>
          <AttachmentRow name="Ort des Schildes">
            <Input
              value={attachment?.sign_location}
              onChange={(e) => {
                updateValue(e.target.value, "sign_location");
              }}
            />
          </AttachmentRow>
          <AttachmentRow name="Beschreibung">
            <Input
              value={attachment?.description}
              onChange={(e) => {
                updateValue(e.target.value, "description");
              }}
            />
          </AttachmentRow>
          <AttachmentRow name="Uhrzeit">
            <Input
              value={attachment?.time}
              onChange={(e) => {
                updateValue(e.target.value, "time");
              }}
            />
          </AttachmentRow>
        </>
      )}
    </AttachmentWrapper>
  );
};

export default Request;
