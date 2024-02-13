import { BroadcastChannel } from "broadcast-channel";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getTempSignsLibMode } from "../../store/slices/application";
const TempTabsConnection = ({ channelId, addImage }) => {
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState(null);
  const signLibMode = useSelector(getTempSignsLibMode);

  console.log("xxx TempTabsConnection id", channelId);

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
      newChannel.postMessage("close");
      newChannel.removeEventListener("message", handleMessage);
      newChannel.close();
    };
  }, [channelId]);

  const closechannel = () => {
    if (channel) {
      channel.postMessage("close");
    }
  };

  return (
    <div>
      {/* <h1>Received Message: {message}</h1> */}
      <button onClick={closechannel}>Close</button>
    </div>
  );
};

export default TempTabsConnection;
