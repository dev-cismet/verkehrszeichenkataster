import { BroadcastChannel } from "broadcast-channel";
import { useState, useEffect } from "react";

const TabsConnection = ({ channelId, addImage }) => {
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const newChannel = new BroadcastChannel(channelId);
    const handleMessage = (newMessage) => {
      console.log("Received message in TempTabsConnection", newMessage);
      setMessage(newMessage);
      addImage(newMessage);
    };

    newChannel.addEventListener("message", handleMessage);
    setChannel(newChannel);

    return () => {
      newChannel.close();
    };
  }, []);

  return <></>;
};

export default TabsConnection;
