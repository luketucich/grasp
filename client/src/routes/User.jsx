import { useParams, useLoaderData } from "react-router";
import useAuthStore from "../stores/authStore";

function User() {
  const currUser = useAuthStore((state) => state.user);
  const currProfileView = useParams().username;
  const { isUser, isOwner } = useLoaderData();

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-gray-100">
      {currUser && isOwner ? (
        <>
          <h3 className="text-lg text-gray-600 mb-6">
            Hi, {currUser.username}! This is your profile.
          </h3>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              // To do
            }}
          >
            Create New Flashcard Set
          </button>
        </>
      ) : isUser ? (
        <h3 className="text-lg text-gray-600 mb-6">
          You are viewing {currProfileView}'s profile.
        </h3>
      ) : (
        <h3 className="text-lg text-gray-600 mb-6">
          This user does not exist.
        </h3>
      )}
    </div>
  );
}

export default User;
