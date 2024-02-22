import { Button, Card, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCurrentApplication,
  updateTimelineValues,
} from "../../store/slices/application";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import addAnordnungAction from "../../store/slices/actionSubslices/addAnordnungAction";
import ExternalRequest from "../application/ExternalRequest";

const Request = ({ attachment, index, isInternalRequest }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentApplication = useSelector(getCurrentApplication);
  const [requester, setRequester] = useState(
    currentApplication.department || "104.11"
  );
  const [receiver, setReceiver] = useState(
    currentApplication.department_name || ""
  );

  const updateValue = (value, property) => {
    dispatch(
      updateTimelineValues({
        timelineIndex: index,
        itemValue: value,
        property: property,
        applicationId: id,
      })
    );
  };

  const setDepartments = (name) => {
    dispatch(
      addAnordnungAction({
        className: "vzk_anordnung",
        data: {
          uuid: currentApplication.uuid,
          department_name: name,
          department: "104.11",
        },
      })
    );
    setReceiver(name);
  };

  return (
    <div
      id={index}
      className="w-full relative pb-4 before:bg-zinc-200 before:absolute before:bottom-0 before:content-[''] before:block before:left-4 before:top-0 before:w-[2px]"
    >
      {isInternalRequest ? (
        <>
          <Card
            size="small"
            type="inner"
            title={
              <div className="font-medium text-lg text-start">Anfrage</div>
            }
          >
            <div className="w-full flex flex-col gap-2">
              {requester ? (
                <span className="w-full text-start text-xl font-medium">
                  Absender: {requester}{" "}
                  <EditOutlined
                    className="cursor-pointer"
                    onClick={() => setRequester("")}
                  />
                </span>
              ) : (
                <div className="flex justify-start items-center gap-2 w-full">
                  <span className="text-xl font-medium">Absender:</span>
                  <Button onClick={() => setRequester("104.11")}>104.11</Button>
                  <Button onClick={() => setRequester("104.23")}>104.23</Button>
                  <Button onClick={() => setRequester("GMW")}>GMW</Button>
                </div>
              )}
              {receiver ? (
                <span className="w-full text-xl text-end font-medium">
                  Adressat: {receiver}{" "}
                  <EditOutlined
                    className="cursor-pointer"
                    onClick={() => setReceiver("")}
                  />
                </span>
              ) : (
                <div className="flex justify-end items-center gap-2 w-full">
                  <span className="text-xl font-medium">Adressat:</span>
                  <Button onClick={() => setDepartments("104.11")}>
                    104.11
                  </Button>
                  <Button onClick={() => setDepartments("104.23")}>
                    104.23
                  </Button>
                  <Button onClick={() => setDepartments("GMW")}>GMW</Button>
                </div>
              )}
            </div>
          </Card>
        </>
      ) : (
        <ExternalRequest attachment={attachment} index={index} />
        // <>
        //   <Card
        //     size="small"
        //     type="inner"
        //     title={
        //       <div className="font-medium text-lg text-start">Anfrage</div>
        //     }
        //   >
        //     <div className="w-full flex justify-between gap-10">
        //       <div className="flex flex-col gap-4 text-start w-full">
        //         <span className="text-lg font-medium">Antragssteller</span>
        //         <div className="flex gap-4 w-full">
        //           <div className="flex flex-col w-full gap-2">
        //             <label htmlFor="requester_first_name">Vorname</label>
        //             <Input
        //               id="requester_first_name"
        //               value={attachment.firstname}
        //               onChange={(e) =>
        //                 setExternalRequest({
        //                   ...externalRequest,
        //                   firstname: e.target.value,
        //                 })
        //               }
        //             />
        //           </div>
        //           <div className="flex flex-col w-full gap-2">
        //             <label htmlFor="requester_last_name">Nachname</label>
        //             <Input
        //               id="requester_last_name"
        //               value={attachment.lastname}
        //               onChange={(e) =>
        //                 setExternalRequest({
        //                   ...externalRequest,
        //                   lastname: e.target.value,
        //                 })
        //               }
        //             />
        //           </div>
        //         </div>
        //         <div className="flex gap-4 w-full">
        //           <div className="flex flex-col w-full gap-2">
        //             <label htmlFor="requester_phone_number">
        //               Telefonnummer
        //             </label>
        //             <Input
        //               id="requester_phone_number"
        //               value={attachment.phone}
        //               onChange={(e) =>
        //                 setExternalRequest({
        //                   ...externalRequest,
        //                   phone: e.target.value,
        //                 })
        //               }
        //             />
        //           </div>
        //           <div className="flex flex-col w-full gap-2">
        //             <label htmlFor="reqeuster_mail">E-Mail</label>
        //             <Input
        //               id="reqeuster_mail"
        //               value={attachment.email}
        //               onChange={(e) =>
        //                 setExternalRequest({
        //                   ...externalRequest,
        //                   email: e.target.value,
        //                 })
        //               }
        //             />
        //           </div>
        //         </div>
        //         <div className="flex gap-4 w-full">
        //           <div className="flex flex-col w-full gap-2">
        //             <label htmlFor="requester_street">Straße</label>
        //             <Input
        //               id="requester_street"
        //               value={attachment.requester_street}
        //               onChange={(e) =>
        //                 setExternalRequest({
        //                   ...externalRequest,
        //                   requester_street: e.target.value,
        //                 })
        //               }
        //             />
        //           </div>
        //           <div className="flex flex-col gap-2">
        //             <label htmlFor="requester_street_number">Hausnummer</label>
        //             <Input
        //               id="requester_street_number"
        //               value={attachment.requester_street_number}
        //               onChange={(e) =>
        //                 setExternalRequest({
        //                   ...externalRequest,
        //                   requester_street_number: e.target.value,
        //                 })
        //               }
        //             />
        //           </div>
        //         </div>
        //         <div className="flex gap-4 w-full">
        //           <div className="flex flex-col gap-2">
        //             <label htmlFor="requester_zip_code">Postleitzahl</label>
        //             <Input
        //               id="requester_zip_code"
        //               value={attachment.requester_postalcode}
        //               onChange={(e) =>
        //                 setExternalRequest({
        //                   ...externalRequest,
        //                   requester_postalcode: e.target.value,
        //                 })
        //               }
        //             />
        //           </div>
        //           <div className="flex flex-col w-full gap-2">
        //             <label htmlFor="requester_city">Stadt</label>
        //             <Input
        //               id="requester_city"
        //               value={attachment.requester_city}
        //               onChange={(e) =>
        //                 setExternalRequest({
        //                   ...externalRequest,
        //                   requester_city: e.target.value,
        //                 })
        //               }
        //             />
        //           </div>
        //         </div>
        //       </div>
        //       <div className="flex flex-col gap-4 text-start w-full">
        //         <span className="text-lg font-medium">Rechnungsadresse</span>
        //         <div className="flex gap-4 w-full">
        //           <div className="flex flex-col w-full gap-2">
        //             <label htmlFor="billing_street">Straße</label>
        //             <Input
        //               id="billing_street"
        //               value={attachment.billing_street}
        //               onChange={(e) =>
        //                 setExternalRequest({
        //                   ...externalRequest,
        //                   billing_street: e.target.value,
        //                 })
        //               }
        //             />
        //           </div>
        //           <div className="flex flex-col gap-2">
        //             <label htmlFor="billing_street_number">Hausnummer</label>
        //             <Input
        //               id="billing_street_number"
        //               value={attachment.billing_street_number}
        //               onChange={(e) =>
        //                 setExternalRequest({
        //                   ...externalRequest,
        //                   billing_street_number: e.target.value,
        //                 })
        //               }
        //             />
        //           </div>
        //         </div>
        //         <div className="flex gap-4 w-full">
        //           <div className="flex flex-col gap-2">
        //             <label htmlFor="billing_zip_code">Postleitzahl</label>
        //             <Input
        //               id="billing_zip_code"
        //               value={attachment.billing_postal_code}
        //               onChange={(e) =>
        //                 setExternalRequest({
        //                   ...externalRequest,
        //                   billing_postal_code: e.target.value,
        //                 })
        //               }
        //             />
        //           </div>
        //           <div className="flex flex-col w-full gap-2">
        //             <label htmlFor="billing_city">Stadt</label>
        //             <Input
        //               id="billing_city"
        //               value={attachment.billing_city}
        //               onChange={(e) =>
        //                 setExternalRequest({
        //                   ...externalRequest,
        //                   billing_city: e.target.value,
        //                 })
        //               }
        //             />
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </Card>
        // </>
      )}
    </div>
  );
};

export default Request;
