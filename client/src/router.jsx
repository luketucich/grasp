import { createBrowserRouter } from "react-router";
import App from "./routes/App.jsx";
import Register from "./components/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/register",
    Component: Register,
    action: async ({ request }) => {
      try {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }

        return { success: "Registration successful", user: data };
      } catch (error) {
        return { error: error.message };
      }
    },
  },
]);

export default router;
