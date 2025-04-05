import { useParams, useLoaderData } from "react-router";
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
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden shadow-xl p-8">
            {currUser && isOwner ? (
              <>
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 mr-4">
                    <UserCircle size={36} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1">
                      Your Profile
                    </h1>
                    <p className="text-zinc-400">
                      Hi, {currUser.username}! This is your profile.
                    </p>
                  </div>
                </div>

                <button
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md shadow-md hover:shadow-blue-500/25 transition-all"
                  onClick={() => {
                    // To do
                  }}
                >
                  <PlusCircle size={18} />
                  <span>Create New Flashcard Set</span>
                </button>
                <SetLibrary />
              </>
            ) : isUser ? (
              <>
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 mr-4">
                    <UserCircle size={36} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1">
                      User Profile
                    </h1>
                    <h2 className="text-zinc-400">
                      You are viewing {currProfileView}'s profile.
                    </h2>
                  </div>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 text-center mt-6">
                  <p className="text-zinc-400">
                    {currProfileView} hasn't created any public flashcard sets
                    yet.
                  </p>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-zinc-900/80 border border-zinc-800 rounded-xl p-8 text-center shadow-xl">
          <UserCircle size={64} className="text-zinc-600 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-white mb-2">
            User Not Found
          </h2>
          <p className="text-zinc-400 mb-6">This user does not exist.</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md transition-all"
          >
            Return Home
          </a>
        </div>
      )}
    </div>
  );
}

export default User;
