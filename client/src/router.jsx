import { createBrowserRouter } from "react-router";
import App from "./routes/App.jsx";
import Register from "./components/Register.jsx";
import LogIn from "./components/LogIn.jsx";
import {
  registerAction,
  loginAction,
  logoutAction,
} from "./actions/authActions.js";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/register",
    Component: Register,
    action: registerAction,
  },
  {
    path: "/login",
    Component: LogIn,
    action: loginAction,
  },
  {
    path: "/logout",
    Component: null,
    action: logoutAction,
  },
]);

export default router;
