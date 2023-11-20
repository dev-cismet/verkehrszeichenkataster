import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import locale from "antd/locale/de_DE";
import {
  RouterProvider,
  createHashRouter,
  useLocation,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./store";

import LoginPage from "./pages/Login";
import { checkJWTValidation } from "./store/slices/auth.js";

const AuthWrapper = () => {
  const jwt = useSelector(getJWT);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(checkJWTValidation());
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <></>;
  }

  if (!jwt) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="h-screen w-full">
      <ConfigProvider componentDisabled={readOnly}>
        <Outlet />
      </ConfigProvider>
    </div>
  );
};

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider locale={locale}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
