import useAuthStore from "../stores/authStore";
import { Edit, Trash2, MoreVertical, Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function SetLibrary() {
  const currUser = useAuthStore((state) => state.user);
  const currUserSets = currUser?.Set;
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (setId) => {
    if (activeDropdown === setId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(setId);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Format date to "Updated Month Day"
  const formatDate = (dateString) => {
    if (!dateString) return "Updated";
    const date = new Date(dateString);
    return `Updated ${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-800">My Flashcard Sets</h1>
        <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors shadow-sm">
          <Plus size={18} className="mr-2" />
          New Set
        </button>
      </div>

      {currUserSets && currUserSets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currUserSets.map((set) => (
            <div
              key={set.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 flex flex-col justify-between relative group"
            >
              <div className="absolute top-4 right-4" ref={dropdownRef}>
                <button
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(set.id);
                  }}
                >
                  <MoreVertical size={18} />
                </button>

                {activeDropdown === set.id && (
                  <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-10 overflow-hidden">
                    <button className="flex items-center w-full px-4 py-3 text-left hover:bg-blue-50 text-blue-500 cursor-pointer">
                      <Edit size={16} className="mr-2" />
                      <span>Edit</span>
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-left hover:bg-red-50 text-red-600 cursor-pointer">
                      <Trash2 size={16} className="mr-2" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <h2 className="text-xl font-semibold text-zinc-900 mb-3 h-7 overflow-hidden text-ellipsis whitespace-nowrap">
                  {set.title}
                </h2>
                <p className="text-zinc-500 mb-4 line-clamp-2 h-12 overflow-hidden">
                  {set.description || "No description provided"}
                </p>

                {/* More compact cards/date section */}
                <div className="flex items-center text-xs text-zinc-400 mt-3">
                  <span>{set.cards?.length || 0} cards</span>
                  <span className="mx-2 text-zinc-300">•</span>
                  <span className="text-zinc-400">
                    {formatDate(set.updatedAt)}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="text-blue-500 hover:text-blue-800 font-medium text-sm cursor-pointer">
                  Study Now
                </button>
              </div>
            </div>
          ))}
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
          <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors shadow-sm w-full md:w-auto">
            Create Your First Set
          </button>
        </div>
      )}
    </div>
  );
}

export default SetLibrary;
