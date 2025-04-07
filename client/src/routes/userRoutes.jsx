import User from "../views/User.jsx";
import { loadUserProfileAction } from "../actions/authActions.js";
import SetCreator from "../components/SetCreator.jsx";
const userRoutes = [
  {
    path: "user/:username",
    element: <User />,
    loader: loadUserProfileAction,
  },
];

export default userRoutes;
