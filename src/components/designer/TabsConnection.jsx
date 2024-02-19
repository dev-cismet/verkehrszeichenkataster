import { BroadcastChannel } from "broadcast-channel";
import { useState, useEffect } from "react";

const TabsConnection = ({ channelId, addImage }) => {
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const newChannel = new BroadcastChannel(channelId);
    console.log("xxx value", newChannel);

    const handleMessage = (newMessage) => {
      console.log("Received message in TempTabsConnection", newMessage);
      setMessage(newMessage);
      addImage(newMessage);
    };

    newChannel.addEventListener("message", handleMessage);
    setChannel(newChannel);

    // const handleBeforeUnload = (e) => {
    //   newChannel.postMessage("close");
    //   console.log("xxx handleBeforeUnload", e);
    // };

    // window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // newChannel.postMessage("close");
      // newChannel.removeEventListener("message", handleMessage);
      // window.removeEventListener("beforeunload", handleBeforeUnload);
      newChannel.close();
    };
  }, []);

  return <></>;
};

export default TabsConnection;
