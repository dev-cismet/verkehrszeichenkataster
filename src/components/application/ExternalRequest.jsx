import {
  CloseOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Dropdown, Input } from "antd";
import { useState } from "react";

const RequestItem = ({ text, value, inputId, fullWidth, isEdit }) => {
  return (
    <div className={`flex flex-col ${fullWidth && "w-full"} gap-2`}>
      <label htmlFor={inputId}>{text}</label>
      {isEdit ? <Input id={inputId} value={value} /> : <div>{value}</div>}
    </div>
  );
};

const ExternalRequest = ({ attachment }) => {
  const [isEdit, setIsEdit] = useState(false);

  const items = [
    {
      label: (
        <div
          onClick={() => {
            setIsEdit(true);
          }}
        >
          Bearbeiten
        </div>
      ),
      key: "0",
    },
  ];

  return (
    <Card
      size="small"
      type="inner"
      title={
        <div className="w-full flex">
          <div className="font-medium text-lg text-start w-full">Anfrage</div>
          <Dropdown
            trigger={["click"]}
            menu={{ items }}
            placement="bottomRight"
          >
            <div className="p-1 flex items-center justify-center hover:bg-zinc-100 rounded-lg cursor-pointer">
              <EllipsisOutlined className="text-2xl" />
            </div>
          </Dropdown>
        </div>
      }
    >
      <div className="flex flex-col w-full gap-2">
        <div className="w-full flex justify-between gap-10">
          <div className="flex flex-col gap-4 text-start w-full">
            <span className="text-lg font-medium">Antragssteller</span>
            <div className="flex gap-4 w-full">
              <RequestItem
                text="Vorname"
                value={attachment.firstname}
                inputId="requester_first_name"
                isEdit={isEdit}
                fullWidth
              />
              <RequestItem
                text="Nachname"
                value={attachment.lastname}
                inputId="requester_last_name"
                isEdit={isEdit}
                fullWidth
              />
            </div>
            <div className="flex gap-4 w-full">
              <RequestItem
                text="Telefonnummer"
                value={attachment.phone}
                inputId="requester_phone_number"
                isEdit={isEdit}
                fullWidth
              />
              <RequestItem
                text="E-Mail"
                value={attachment.email}
                inputId="reqeuster_mail"
                isEdit={isEdit}
                fullWidth
              />
            </div>
            <div className="flex gap-4 w-full">
              <RequestItem
                text="Straße"
                value={attachment.requester_street}
                inputId="requester_street"
                isEdit={isEdit}
                fullWidth
              />
              <RequestItem
                text="Hausnummer"
                value={attachment.requester_street_number}
                inputId="requester_street_number"
                isEdit={isEdit}
              />
            </div>
            <div className="flex gap-4 w-full">
              <RequestItem
                text="Postleitzahl"
                value={attachment.requester_postalcode}
                inputId="requester_postalcode"
                isEdit={isEdit}
              />
              <RequestItem
                text="Stadt"
                value={attachment.requester_city}
                inputId="requester_city"
                isEdit={isEdit}
                fullWidth
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 text-start w-full">
            <span className="text-lg font-medium">Rechnungsadresse</span>
            <div className="flex gap-4 w-full">
              <RequestItem
                text="Straße"
                value={attachment.billing_street}
                inputId="billing_street"
                isEdit={isEdit}
                fullWidth
              />
              <RequestItem
                text="Hausnummer"
                value={attachment.billing_street_number}
                inputId="billing_street_number"
                isEdit={isEdit}
              />
            </div>
            <div className="flex gap-4 w-full">
              <RequestItem
                text="Postleitzahl"
                value={attachment.billing_postal_code}
                inputId="billing_postal_code"
                isEdit={isEdit}
              />
              <RequestItem
                text="Stadt"
                value={attachment.billing_city}
                inputId="billing_city"
                isEdit={isEdit}
                fullWidth
              />
            </div>
          </div>
        </div>

        {isEdit && (
          <div className="w-full flex items-center gap-2 justify-end">
            <Button icon={<CloseOutlined />} onClick={() => setIsEdit(false)}>
              Abbrechen
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setIsEdit(false);
              }}
            >
              Anfrage Bearbeiten
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ExternalRequest;
