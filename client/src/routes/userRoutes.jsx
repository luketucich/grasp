import User from "../views/User.jsx";
import {
  loadUserProfileAction,
  loadUserSetAction,
} from "../actions/authActions.js";
import SetEditor from "../components/SetEditor.jsx";
const userRoutes = [
  {
    path: "user/:username",
    element: <User />,
    loader: loadUserProfileAction,
  },
  {
    path: "user/:username/set/:setId/edit",
    element: <SetEditor />,
    loader: loadUserSetAction,
  },
];

export default userRoutes;
