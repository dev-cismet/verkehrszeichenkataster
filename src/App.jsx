import { useState } from "react";
import { useSelector } from "react-redux";
import { getJWT } from "./store/slices/auth";

function App() {
  const [count, setCount] = useState(0);
  const jwt = useSelector(getJWT);

  return <div>{jwt}</div>;
}

export default App;
