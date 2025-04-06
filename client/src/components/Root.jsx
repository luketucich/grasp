import { useEffect } from "react";
import { RouterProvider } from "react-router";
import useAuthStore from "../stores/authStore";
import router from "../router.jsx";
import GraphPaperBackground from "./GraphPaperBackground.jsx";

function Root() {
  const checkForUser = useAuthStore((state) => state.checkForUser);

  useEffect(() => {
    checkForUser();
  }, [checkForUser]);

  return (
    <RouterProvider
      router={router}
      hydrateFallback={<GraphPaperBackground />}
    />
  );
}

export default Root;
