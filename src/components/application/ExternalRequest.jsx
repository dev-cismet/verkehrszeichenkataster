import {
  CloseOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Dropdown, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTimelineData } from "../../store/slices/application";

const RequestItem = ({ text, value, inputId, fullWidth, isEdit, onChange }) => {
  return (
    <div className={`flex flex-col ${fullWidth && "w-full"} gap-2`}>
      <label htmlFor={inputId}>{text}</label>
      {isEdit ? (
        <Input
          id={inputId}
          defaultValue={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div
          className={`${
            fullWidth && "w-full"
          } font-[500] text-lg py-1 min-w-[117.7px] min-h-[32px]`}
        >
          {value}
        </div>
      )}
    </div>
  );
};

const ExternalRequest = ({ attachment, index }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [request, setRequest] = useState({});

  const dispatch = useDispatch();

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
                value={attachment.data?.firstname}
                inputId="requester_first_name"
                isEdit={isEdit}
                onChange={(text) => setRequest({ ...request, firstname: text })}
                fullWidth
              />
              <RequestItem
                text="Nachname"
                value={attachment.data?.lastname}
                inputId="requester_last_name"
                isEdit={isEdit}
                onChange={(text) => setRequest({ ...request, lastname: text })}
                fullWidth
              />
            </div>
            <div className="flex gap-4 w-full">
              <RequestItem
                text="Telefonnummer"
                value={attachment.data?.phone}
                inputId="requester_phone_number"
                isEdit={isEdit}
                onChange={(text) => setRequest({ ...request, phone: text })}
                fullWidth
              />
              <RequestItem
                text="E-Mail"
                value={attachment.data?.email}
                inputId="reqeuster_mail"
                isEdit={isEdit}
                onChange={(text) => setRequest({ ...request, email: text })}
                fullWidth
              />
            </div>
            <div className="flex gap-4 w-full">
              <RequestItem
                text="Straße"
                value={attachment.data?.requester_street}
                inputId="requester_street"
                isEdit={isEdit}
                onChange={(text) =>
                  setRequest({ ...request, requester_street: text })
                }
                fullWidth
              />
              <RequestItem
                text="Hausnummer"
                value={attachment.data?.requester_street_number}
                inputId="requester_street_number"
                isEdit={isEdit}
                onChange={(text) =>
                  setRequest({ ...request, requester_street_number: text })
                }
              />
            </div>
            <div className="flex gap-4 w-full">
              <RequestItem
                text="Postleitzahl"
                value={attachment.data?.requester_postalcode}
                inputId="requester_postalcode"
                isEdit={isEdit}
                onChange={(text) =>
                  setRequest({ ...request, requester_postalcode: text })
                }
              />
              <RequestItem
                text="Stadt"
                value={attachment.data?.requester_city}
                inputId="requester_city"
                isEdit={isEdit}
                onChange={(text) =>
                  setRequest({ ...request, requester_city: text })
                }
                fullWidth
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 text-start w-full">
            <span className="text-lg font-medium">Rechnungsadresse</span>
            <div className="flex gap-4 w-full">
              <RequestItem
                text="Straße"
                value={attachment.data?.billing_street}
                inputId="billing_street"
                isEdit={isEdit}
                onChange={(text) =>
                  setRequest({ ...request, billing_street: text })
                }
                fullWidth
              />
              <RequestItem
                text="Hausnummer"
                value={attachment.data?.billing_street_number}
                inputId="billing_street_number"
                isEdit={isEdit}
                onChange={(text) =>
                  setRequest({ ...request, billing_street_number: text })
                }
              />
            </div>
            <div className="flex gap-4 w-full">
              <RequestItem
                text="Postleitzahl"
                value={attachment.data?.billing_postal_code}
                inputId="billing_postal_code"
                isEdit={isEdit}
                onChange={(text) =>
                  setRequest({ ...request, billing_postal_code: text })
                }
              />
              <RequestItem
                text="Stadt"
                value={attachment.data?.billing_city}
                inputId="billing_city"
                isEdit={isEdit}
                onChange={(text) =>
                  setRequest({ ...request, billing_city: text })
                }
                fullWidth
              />
            </div>
          </div>
        </div>

        {isEdit && (
          <div className="w-full flex items-center gap-2 justify-end">
            <Button
              icon={<CloseOutlined />}
              onClick={() => {
                setIsEdit(false);
                setRequest({});
              }}
            >
              Abbrechen
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                dispatch(
                  updateTimelineData({
                    timelineIndex: index,
                    values: request,
                  })
                );
                setIsEdit(false);
                setRequest({});
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
