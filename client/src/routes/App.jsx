import { useSubmit, Link } from "react-router";
import useAuthStore from "../stores/authStore";

function App() {
  const submit = useSubmit();
  const user = useAuthStore((state) => state.user);
  const handleLogout = () => {
    submit(null, { method: "post", action: "/logout" });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-gray-100">
      <h1 className="text-3xl">Welcome to Grasp</h1>
      <div className="flex flex-col items-center justify-center mt-4 gap-1 w-full max-w-xs">
        {/* If no user, provide register/login options */}
        {!user && (
          <>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full">
              <Link to="/register" className="block">
                Register
              </Link>
            </button>
            <button className="bg-gray-400 text-white font-bold py-2 px-4 rounded w-full">
              <Link to="/login" className="block">
                Log-In
              </Link>
            </button>
          </>
        )}

        {/* If user, only display log out option */}
        {user && (
          <>
            <h3>Hi, {user.username}!</h3>
            <button
              onClick={handleLogout}
              className="bg-red-300 text-white font-bold py-2 px-4 rounded w-full cursor-pointer"
            >
              Log-Out
            </button>

            <button className="bg-purple-300 text-white font-bold py-2 px-4 rounded w-full cursor-pointer">
              <Link to={`/user/${user.username}`} className="block">
                View your account
              </Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
