import { BroadcastChannel } from "broadcast-channel";
import { useState, useEffect } from "react";

const TempTabsConnection = ({ channelId }) => {
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState(null);
  console.log("xxx TempTabsConnection id", channelId);
  useEffect(() => {
    const newChannel = new BroadcastChannel(channelId);

    const handleMessage = (newMessage) => {
      console.log("Received message in TempTabsConnection", newMessage);
      setMessage(newMessage);
    };

    newChannel.addEventListener("message", handleMessage);
    setChannel(newChannel);

    return () => {
      newChannel.removeEventListener("message", handleMessage);
      newChannel.close();
    };
  }, []);

  const closechannel = () => {
    if (channel) {
      channel.postMessage("close");
    }
  };

  return (
    <div>
      <h1>Received Message: {message}</h1>
      <button onClick={closechannel}>Close</button>
    </div>
  );
};

export default TempTabsConnection;
