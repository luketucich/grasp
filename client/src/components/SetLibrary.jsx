import useAuthStore from "../stores/authStore";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import Set from "./Set";

function SetLibrary() {
  const currUser = useAuthStore((state) => state.user);
  const currUserSets = currUser?.Set;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-800">Flashcard Sets</h1>
        <Link
          to="/create/set"
          className="cursor-pointer flex items-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={18} className="mr-2" />
          Create New Set
        </Link>
      </div>

      {currUserSets && currUserSets.length > 0 ? (
        <div className="h-[20rem] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currUserSets.map((set) => (
              <Set key={set.id} set={set} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center mt-6 max-w-md mx-auto shadow-md">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-50 p-4 rounded-full">
              <Plus size={32} className="text-blue-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">No flashcard sets yet</h3>
          <p className="text-zinc-500 mb-6">
            Create your first set to start studying
          </p>
          <Link
            to="/create/set"
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors shadow-sm w-full md:w-auto inline-block"
          >
            Create Your First Set
          </Link>
        </div>
      )}
    </div>
  );
}

export default SetLibrary;
