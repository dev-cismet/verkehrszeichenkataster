import { Button, Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import {
  DiffOutlined,
  FolderOpenOutlined,
  LogoutOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeJWT, storeLogin } from "../../store/slices/auth";
import { useEffect } from "react";
import {
  getAllApplications,
  getCurrentApplication,
  getSelectedApplications,
  storeSelectedApplications,
} from "../../store/slices/application";
import Logo from "/cismet.svg";
import "./input.css";
import addAnordnungAction from "../../store/slices/actionSubslices/addAnordnungAction";
import { getId } from "../../store/slices/offlineActionDb";

const navLinks = () => {
  return [];
};

const NavBar = ({ width = "100%", height = 104, style, inStory }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const links = navLinks();
  const location = useLocation();
  const [urlParams, setUrlParams] = useSearchParams();
  const { pathname } = useLocation();
  const selectedApplications = useSelector(getSelectedApplications);
  const currentApplication = useSelector(getCurrentApplication);
  const id = useSelector(getId);

  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "10px",
    };
  }

  const logout = () => {
    dispatch(storeJWT(undefined));
    dispatch(storeLogin(undefined));
  };

  const getApplicationPath = (id) => {
    const parts = pathname.split("/");
    const currentId = parts[2];

    let newPath = pathname.replace(`/${currentId}/`, `/${id}/`);
    if (!newPath.includes("/anordnung/")) {
      newPath = "/anordnung/" + id + "/verlauf";
    }
    return newPath;
  };

  const createApplication = (type) => {
    const id = uuidv4();
    const requestId = uuidv4();
    const attachmentId = uuidv4();
    const anordnung = {
      title:
        type === "internal"
          ? "Errichtung von Verkehrszeichen und einrichtungen gemäß §45 Abs. 3 StVO"
          : "",
      uuid: id,
      vzk_type: {
        id: 1,
        name: type,
      },
      vzk_status: {
        id: 1,
        name: "offen",
      },
      vzk_anordnung_timelineArrayRelationShip: [
        {
          uuid: attachmentId,
          fk_uuid: requestId,
          vzk_attachment_typ: {
            id: 1,
            name: "Request",
          },
        },
      ],
    };

    dispatch(
      addAnordnungAction({
        className: "vzk_attachment_request",
        data: {
          uuid: requestId,
        },
      })
    );

    dispatch(
      addAnordnungAction({
        className: "vzk_anordnung",
        data: anordnung,
      })
    );
    dispatch(storeSelectedApplications([...selectedApplications, anordnung]));

    navigate({ pathname: getApplicationPath(id) });
  };

  return (
    <header
      className="flex flex-col gap-3 border-solid border-b-2 border-0 border-zinc-200 bg-[#00000005]"
      style={{ ...style, ...storyStyle, width, height }}
    >
      <div className="flex items-center justify-between p-2 gap-3 max-w-full">
        <div className="md:flex hidden items-center gap-3 overflow-clip w-full">
          <div
            className="flex gap-2 items-center h-full cursor-pointer"
            onClick={() => navigate("/" + `?${urlParams}`)}
          >
            <img src={Logo} alt="Logo" className="h-10" />
            <span
              className={`${
                location.pathname === "/" ? "text-primary" : ""
              } font-semibold no-underline pt-1`}
            >
              VZKat
            </span>
          </div>

          {links.map((link, i) => (
            <Link to={link.href + `?${urlParams}`} key={`navLink_${i}`}>
              <Button
                icon={<FolderOpenOutlined />}
                size="small"
                className={`${
                  location.pathname.includes(link.href) ? "text-primary" : ""
                } font-semibold no-underline mt-1 bg-[#00000005]`}
              >
                {link.title}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Input
            size="small"
            placeholder="Suche..."
            prefix={<SearchOutlined />}
            className="w-96 bg-[#00000005]"
          />
          <Button
            size="small"
            className="bg-[#00000005]"
            onClick={() => {
              createApplication("internal");
            }}
            icon={<PlusOutlined />}
          >
            Intern
          </Button>
          <Button
            size="small"
            className="bg-[#00000005]"
            onClick={() => {
              createApplication("external");
            }}
            icon={<PlusOutlined />}
          >
            Extern
          </Button>
          <LogoutOutlined
            className="text-2xl cursor-pointer pr-1"
            onClick={() => logout()}
          />
        </div>
      </div>
      <div className="w-full px-2">
        <ul className="flex items-center gap-2 list-none px-0">
          {selectedApplications?.map((application, i) => (
            <li
              className={`p-2 text-sm hover:bg-gray-100 rounded-lg cursor-pointer relative ${
                pathname.includes("anordnung/" + application?.id + "/") &&
                "after:bg-primary after:rounded-md after:absolute after:-bottom-3 after:left-0 after:w-full after:h-0.5 after:content-[''] font-semibold"
              }`}
            >
              <Link
                to={getApplicationPath(application?.uuid)}
                className="flex items-center gap-2"
              >
                <DiffOutlined className="text-xl" />
                <span>{application.id}</span>
                <span>{application.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
