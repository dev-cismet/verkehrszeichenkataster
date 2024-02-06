import { useDispatch, useSelector } from "react-redux";
import {
  getTempSignsLibMode,
  storeTempSignsLibMode,
} from "../../store/slices/application";
const TempSignsLibMock = () => {
  const anordnung = useSelector(getTempSignsLibMode);
  // const dispatch = useDispatch();
  console.log("xxx =====", anordnung);
  return (
    <div style={{ width: "100%", height: "100%", background: "green" }}></div>
  );
};

export default TempSignsLibMock;
