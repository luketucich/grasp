import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  ChevronDown,
  Plus,
  FolderOpen,
  Settings,
  PanelLeft,
} from "lucide-react";
import useAuthStore from "../stores/authStore";

function Sidebar() {
  const [isSetsExpanded, setIsSetsExpanded] = useState(true);
  const currUser = useAuthStore((state) => state.user);
  const currUserSets = currUser?.Set;

  // Initialize state based on window size
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return window.innerWidth < 1024;
  });

  // Handle window resize events to update sidebar state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      isCollapsed ? "4rem" : "15rem"
    );
  }, [isCollapsed]);

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen pt-20 transition-all duration-300 shadow-md-right ${
        isCollapsed ? "w-16 translate-x-0" : "w-60 translate-x-0 opacity-100"
      } bg-white overflow-hidden whitespace-nowrap border-r border-gray-350`}
    >
      <div className="h-full px-3 py-4 flex flex-col">
        {/* Toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`${
            isCollapsed ? "mx-auto" : "ml-auto"
          } p-1 text-gray-500 hover:text-blue-500 mb-2 cursor-pointer transition-colors duration-200`}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft
            size={18}
            className={`transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Sidebar header - only show when expanded */}
        {!isCollapsed && (
          <div className="px-2 mb-6">
            <h2 className="text-xl font-bold text-zinc-900 mb-1">
              <span className="relative inline-block">Library</span>
            </h2>
            <p className="text-xs text-zinc-500 font-light">
              Your learning materials
            </p>
          </div>
        )}

        {/* Sidebar navigation */}
        <nav className="space-y-1.5 flex-1 overflow-y-auto">
          {/* 'Your Sets' expandable section */}
          <div className="pt-1">
            {!isCollapsed ? (
              <button
                onClick={() => setIsSetsExpanded(!isSetsExpanded)}
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center" : "justify-between"
                } px-3 py-2 text-zinc-700 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors overflow-hidden cursor-pointer`}
                aria-expanded={isSetsExpanded}
              >
                <div className="flex items-center gap-3 min-w-max">
                  <FolderOpen size={18} className="flex-shrink-0" />
                  <span className="font-medium">Your Sets</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isSetsExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            ) : (
              <Link
                to={`/user/${currUser.username}`}
                className="flex items-center justify-center gap-2 px-3 py-2 text-zinc-700 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              >
                <FolderOpen size={18} className="flex-shrink-0" />
              </Link>
            )}

            {/* Sets list - only show when expanded */}
            {!isCollapsed && (
              <div
                className={`overflow-y-scroll transition-all duration-300 ${
                  isSetsExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-6 pr-3 py-2 space-y-1">
                  {currUserSets &&
                    currUserSets.map((set) => (
                      <Link
                        key={set.id}
                        to={`/sets/${set.id}`}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-600 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors truncate cursor-pointer"
                      >
                        {set.title}
                      </Link>
                    ))}

                  <Link
                    to="/create/set"
                    className="flex items-center gap-2 px-3 py-2 mt-2 text-sm font-medium text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors cursor-pointer shadow-sm"
                  >
                    <Plus size={16} className="flex-shrink-0" />
                    <span>Create new set</span>
                  </Link>
                </div>
              </div>
            )}

            {/* 'Create new set' button for collapsed state */}
            {isCollapsed && (
              <Link
                to="/create/set"
                className="flex justify-center items-center mt-3 p-2 text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors cursor-pointer shadow-sm"
                title="Create new set"
              >
                <Plus size={18} className="flex-shrink-0" />
              </Link>
            )}
          </div>
        </nav>

        {/* Bottom section */}
        <div
          className={`pt-4 mt-4 border-t border-gray-200 ${
            isCollapsed ? "flex justify-center" : ""
          }`}
        >
          <Link
            to="/settings"
            className={`flex items-center ${
              isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2"
            } text-zinc-600 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors overflow-hidden cursor-pointer`}
          >
            <Settings size={18} className="flex-shrink-0" />
            {!isCollapsed && (
              <span className="min-w-max font-medium">Settings</span>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
