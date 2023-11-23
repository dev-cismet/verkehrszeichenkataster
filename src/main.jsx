import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import locale from "antd/locale/de_DE";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createHashRouter,
  useLocation,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";

import LoginPage from "./pages/LoginPage.jsx";
import { checkJWTValidation, getJWT } from "./store/slices/auth.js";
import { useEffect } from "react";

const AuthWrapper = () => {
  const jwt = useSelector(getJWT);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkJWTValidation());
  }, []);

  if (!jwt) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="h-screen w-full">
      <ConfigProvider>
        <Outlet />
      </ConfigProvider>
    </div>
  );
};

const productionMode = process.env.NODE_ENV === "production";

const router = createHashRouter([
  {
    path: "/",
    element: <AuthWrapper />,
    errorElement: productionMode && (
      <Result
        status="404"
        title="404"
        subTitle="Die Seite wurde nicht gefunden"
        extra={
          <Button type="primary" href="/">
            Zurück
          </Button>
        }
      />
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
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
