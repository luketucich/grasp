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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currUser = useAuthStore((state) => state.user);
  const currUserSets = currUser?.Set;

  // Toggle sidebar collapse on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen pt-20 transition-all duration-300 ${
        isCollapsed ? "w-16 translate-x-0" : "w-56 translate-x-0 opacity-100"
      } bg-black border-r border-zinc-800 overflow-hidden whitespace-nowrap`}
    >
      <div className="h-full px-3 py-4 flex flex-col">
        {/* Toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`${
            isCollapsed ? "mx-auto" : "ml-auto"
          } p-1 text-zinc-400 hover:text-white mb-2 cursor-pointer`}
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
          <div className="px-2 mb-4">
            <h2 className="text-lg font-semibold text-white mb-1">Library</h2>
            <p className="text-xs text-zinc-400">Your learning materials</p>
          </div>
        )}

        {/* Sidebar navigation */}
        <nav className="space-y-1.5 flex-1 overflow-y-auto">
          {/* Your Sets expandable section */}
          <div className="pt-1">
            <button
              onClick={() => !isCollapsed && setIsSetsExpanded(!isSetsExpanded)}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center" : "justify-between"
              } px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-md transition-colors overflow-hidden cursor-pointer`}
              aria-expanded={isSetsExpanded}
            >
              <div className="flex items-center gap-3 min-w-max">
                <FolderOpen size={18} className="flex-shrink-0" />
                {!isCollapsed && <span>Your Sets</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isSetsExpanded ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {/* Sets list - only show when expanded */}
            {!isCollapsed && (
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isSetsExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-6 pr-3 py-2 space-y-1">
                  {currUserSets &&
                    currUserSets.map((set) => (
                      <Link
                        key={set.id}
                        to={`/sets/${set.id}`}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/40 rounded-md transition-colors truncate cursor-pointer"
                      >
                        {set.title}
                      </Link>
                    ))}

                  <Link
                    to="/sets/create"
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded-md transition-colors mt-2 cursor-pointer"
                  >
                    <Plus size={16} className="flex-shrink-0" />
                    <span>Create new set</span>
                  </Link>
                </div>
              </div>
            )}

            {/* "Create new set" button for collapsed state */}
            {isCollapsed && (
              <Link
                to="/sets/create"
                className="flex justify-center items-center mt-3 p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded-md transition-colors cursor-pointer"
                title="Create new set"
              >
                <Plus size={18} className="flex-shrink-0" />
              </Link>
            )}
          </div>
        </nav>

        {/* Bottom section */}
        <div
          className={`pt-4 mt-4 border-t border-zinc-800 ${
            isCollapsed ? "flex justify-center" : ""
          }`}
        >
          <Link
            to="/settings"
            className={`flex items-center ${
              isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2"
            } text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-md transition-colors overflow-hidden cursor-pointer`}
          >
            <Settings size={18} className="flex-shrink-0" />
            {!isCollapsed && <span className="min-w-max">Settings</span>}
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
