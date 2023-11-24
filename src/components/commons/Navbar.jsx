import { Button, Tooltip } from "antd";

import { LogoutOutlined } from "@ant-design/icons";

import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeJWT, storeLogin } from "../../store/slices/auth";

const navLinks = () => {
  return [
    {
      title: "Übersicht",
      href: "/uebersicht",
    },
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

  return (
    <header
      className="flex items-center justify-between bg-white p-2 gap-3 "
      style={{ ...style, ...storyStyle, width, height }}
    >
      <div className="md:flex hidden items-center gap-3">
        <div
          className="flex gap-2 items-center h-full cursor-pointer"
          onClick={() => navigate("/" + `?${urlParams}`)}
        >
          {/* <img src={Logo} alt="Logo" className="h-10" /> */}
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
              <div className="hidden xl:block">{link.title}</div>
            </Button>
          </Link>
        ))}
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
