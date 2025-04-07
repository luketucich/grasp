import { createBrowserRouter } from "react-router";
import Hero from "./views/Hero.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import User from "./views/User.jsx";
import RootLayout from "./components/layouts/RootLayout.jsx";
import Error from "./views/Error.jsx";
import userRoutes from "./routes/userRoutes.jsx";
import {
  signupAction,
  loginAction,
  logoutAction,
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
      ...userRoutes,
    ],
  },
]);

export default router;
