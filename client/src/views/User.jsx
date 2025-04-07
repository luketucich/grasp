import { useParams, useLoaderData, Link } from "react-router";
import useAuthStore from "../stores/authStore";
import { UserCircle, PlusCircle } from "lucide-react";
import SetLibrary from "../components/SetLibrary";

function User() {
  const currUser = useAuthStore((state) => state.user);
  const currProfileView = useParams().username;
  const { isUser, isOwner } = useLoaderData();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {isUser ? (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-350 rounded-xl overflow-hidden shadow-md p-8">
            {currUser && isOwner ? (
              <>
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mr-4">
                    <UserCircle size={36} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-zinc-900 mb-1">
                      Your Profile
                    </h1>
                    <p className="text-zinc-500">
                      Hi, {currUser.username}! This is your profile.
                    </p>
                  </div>
                </div>
                <SetLibrary />
              </>
            ) : isUser ? (
              <>
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mr-4">
                    <UserCircle size={36} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-zinc-900 mb-1">
                      User Profile
                    </h1>
                    <h2 className="text-zinc-500">
                      You are viewing {currProfileView}'s profile.
                    </h2>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center mt-6">
                  <p className="text-zinc-500">
                    {currProfileView} hasn't created any public flashcard sets
                    yet.
                  </p>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-xl p-8 text-center shadow-md">
          <UserCircle size={64} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-zinc-900 mb-2">
            User Not Found
          </h2>
          <p className="text-zinc-500 mb-6">This user does not exist.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 py-2.5 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-blue-200/50"
          >
            Return Home
          </Link>
        </div>
      )}
    </div>
  );
}

export default User;
