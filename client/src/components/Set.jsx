import { useState, useRef, useEffect } from "react";
import { Edit, Trash2, MoreVertical } from "lucide-react";
import useAuthStore from "../stores/authStore";
import { Link } from "react-router";

function Set({ set }) {
  const currUser = useAuthStore((state) => state.user);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setActiveDropdown(!activeDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(false);
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
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 flex flex-col justify-between relative group">
      <div className="absolute top-4 right-4" ref={dropdownRef}>
        <button
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={toggleDropdown}
        >
          <MoreVertical size={18} />
        </button>

        {activeDropdown && (
          <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-10 overflow-hidden">
            <Link
              to={`/user/${currUser.username}/set/${set.id}/edit`}
              className="flex items-center w-full px-4 py-3 text-left hover:bg-blue-50 text-blue-500 cursor-pointer"
            >
              <Edit size={16} className="mr-2" />
              <span>Edit</span>
            </Link>
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
          <span className="text-zinc-400">{formatDate(set.updatedAt)}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link
          to={`/user/${currUser.username}/set/${set.id}`}
          className="text-blue-500 hover:text-blue-800 font-medium text-sm cursor-pointer"
        >
          Study Now
        </Link>
      </div>
    </div>
  );
}

export default Set;
