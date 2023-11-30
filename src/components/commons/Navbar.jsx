import { Button, Dropdown } from "antd";

import { EllipsisOutlined, LogoutOutlined } from "@ant-design/icons";

import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeJWT, storeLogin } from "../../store/slices/auth";
import { getSelectedApplications } from "../../store/slices/navigation";
import { useEffect, useRef, useState } from "react";
import { getNumberOfItemsThatFit } from "../../tools/helper";

const navLinks = () => {
  return [
    {
      title: "Tabelle",
      href: "/tabelle",
    },
  ];
};

const NavBar = ({ width = "100%", height = 73, style, inStory }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const links = navLinks();
  const location = useLocation();
  const [urlParams, setUrlParams] = useSearchParams();
  const { pathname } = useLocation();
  const selectedApplications = useSelector(getSelectedApplications);
  const selectedApplicationsOuterRef = useRef(null);
  const [selectedApplicationsWidth, setSelectedApplicationsWidth] = useState(0);
  const items = selectedApplications
    ?.slice(
      getNumberOfItemsThatFit(selectedApplicationsWidth, 112),
      selectedApplications?.length
    )
    .map((item, i) => {
      return {
        label: item.name,
        key: i,
      };
    });

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
      newPath = "/anordnung/" + id + "/uebersicht";
    }
    return newPath;
  };

  useEffect(() => {
    setSelectedApplicationsWidth(
      selectedApplicationsOuterRef.current.offsetWidth
    );

    const getWidth = () => {
      setSelectedApplicationsWidth(
        selectedApplicationsOuterRef.current.offsetWidth
      );
    };

    window.addEventListener("resize", getWidth);

    return () => window.removeEventListener("resize", getWidth);
  }, []);

  return (
    <header
      className="flex items-center justify-between bg-white p-2 gap-3 max-w-full"
      style={{ ...style, ...storyStyle, width, height }}
    >
      <div className="md:flex hidden items-center gap-3 overflow-clip w-full">
        <div
          className="flex gap-2 items-center h-full cursor-pointer"
          onClick={() => navigate("/" + `?${urlParams}`)}
        >
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
              type="text"
              className={`${
                location.pathname.includes(link.href) ? "text-primary" : ""
              } font-semibold no-underline`}
            >
              <div
                className={`xl:hidden block ${
                  (location.pathname.includes(link.href) && i > 0) ||
                  (link.href === "/" && location.pathname === "/")
                    ? "text-primary"
                    : ""
                }`}
              >
                {link.icon}
              </div>
              <div className="hidden md:block text-sm">{link.title}</div>
            </Button>
          </Link>
        ))}
        <div
          className="flex items-center overflow-clip w-full gap-2"
          ref={selectedApplicationsOuterRef}
        >
          {selectedApplications
            ?.slice(0, getNumberOfItemsThatFit(selectedApplicationsWidth, 112))
            .map((application, i) => (
              <Link
                to={getApplicationPath(application.key)}
                key={`applicationLink_${i}`}
              >
                <Button
                  type="text"
                  className={`${
                    location.pathname.includes("anordnung/" + application.key)
                      ? "text-primary"
                      : ""
                  } font-semibold no-underline w-32`}
                >
                  <div className="hidden md:block truncate text-sm">
                    {"Anordnung " + application.name}
                  </div>
                </Button>
              </Link>
            ))}
          {selectedApplications.length >
            getNumberOfItemsThatFit(selectedApplicationsWidth, 112) && (
            <Dropdown trigger={["click"]} menu={{ items }}>
              <Button type="text">
                <EllipsisOutlined />
              </Button>
            </Dropdown>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <LogoutOutlined
          className="text-2xl cursor-pointer"
          onClick={() => logout()}
        />
      </div>
    </header>
  );
};

export default NavBar;
