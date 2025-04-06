import { createBrowserRouter } from "react-router";
import Hero from "./routes/Hero.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import User from "./routes/User";
import RootLayout from "./components/layouts/RootLayout";
import Error from "./routes/Error.jsx";
import {
  signupAction,
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
        element: <Hero />,
      },
      {
        path: "signup",
        element: <Signup />,
        action: signupAction,
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
