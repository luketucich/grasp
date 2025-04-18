import { redirect } from "react-router";
import useAuthStore from "../stores/authStore";

export async function signupAction({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return redirect("/");
  } catch (error) {
    return { error: error.message };
  }
}

export async function loginAction({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Log-In failed");
    }

    useAuthStore.getState().setUser(data);

    // Ensure auth state is updated before redirecting
    await useAuthStore.getState().checkForUser();
    return redirect(`/user/${data.username}`);
  } catch (error) {
    return { error: error.message };
  }
}

export async function logoutAction() {
  try {
    const response = await fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    useAuthStore.getState().clearUser();
    return redirect("/");
  } catch (error) {
    return { error: error.message };
  }
}

export async function loadUserProfileAction({ params }) {
  try {
    const response = await fetch(
      `http://localhost:3000/user/${params.username}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to check profile ownership");
    }

    const data = await response.json();

    return { isUser: data.isUser, isOwner: data.isOwner };
  } catch (error) {
    return { isUser: false, isOwner: false, error: error.message };
  }
}

export async function createSetAction({ request }) {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");

    const response = await fetch(`http://localhost:3000/create/set`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      throw new Error("Set creation failed");
    }

    // Ensure auth state is updated before redirecting
    await useAuthStore.getState().checkForUser();

    // Redirect to the user's profile page
    const data = await response.json();
    return redirect(`/user/${data.authorUsername}`);
  } catch (error) {
    console.error("Error creating set:", error);
    return { error: "Failed to create set. Please try again." };
  }
}

export async function loadUserSetAction({ params }) {
  try {
    const response = await fetch(
      `http://localhost:3000/user/${params.username}/set/${params.setId}/edit`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to load set");
    }
    const data = await response.json();
    console.log("Loaded set data:", data);
    return data;
  } catch (error) {
    console.error("Error loading set:", error);
    return { error: "Failed to load set. Please try again." };
  }
}
