import { createBrowserRouter } from "react-router";
import App from "./routes/App";
import Register from "./components/Register";
import Login from "./components/Login";
import User from "./routes/User";
import RootLayout from "./components/layouts/RootLayout";
import Error from "./routes/Error.jsx";
import {
  registerAction,
  loginAction,
  logoutAction,
  loadUserProfileAction,
} from "./actions/authActions.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "user/:username",
        element: <User />,
        loader: loadUserProfileAction,
      },
    ],
  },
]);

export default router;
