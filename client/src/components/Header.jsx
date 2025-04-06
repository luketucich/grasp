import { useState, useEffect } from "react";
import { Link, Form } from "react-router";
import useAuthStore from "../stores/authStore";
import { Menu, X, ChevronDown, User, LogOut, BookOpen } from "lucide-react";

function Header() {
  const currUser = useAuthStore((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isProfileDropdownOpen && !e.target.closest(".profile-dropdown")) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileDropdownOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-[0.075rem] border-gray-350 shadow-md
        ${isScrolled ? "bg-white/75 backdrop-blur-md" : "bg-white"}`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-2xl text-zinc-900 group"
            aria-label="Grasp homepage"
          >
            <span className="relative z-10 text-blue-500 transition-all duration-300 group-hover:text-blue-600">
              Grasp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {currUser && (
              <Link
                to={`/user/${currUser.username}`}
                className="relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-zinc-700 hover:text-blue-500 hover:bg-blue-50 transition-all"
              >
                <BookOpen size={18} />
                <span>Your Library</span>
              </Link>
            )}

            {!currUser ? (
              <>
                <Link
                  to="/login"
                  className="relative px-4 py-2 rounded-lg text-zinc-700 hover:text-blue-500 hover:bg-blue-50 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-1 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all shadow-md hover:shadow-blue-200"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative profile-dropdown">
                <button
                  type="button"
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-zinc-700 hover:text-blue-500 hover:bg-blue-50 transition-all"
                  aria-expanded={isProfileDropdownOpen}
                  aria-haspopup="true"
                >
                  <User size={18} />
                  <span>{currUser.username}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white border-[0.075rem] border-gray-350 shadow-lg focus:outline-none py-1">
                    {" "}
                    <div className="px-3 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="font-medium truncate text-zinc-800">
                        {currUser.username}
                      </p>
                    </div>
                    <div className="py-1">
                      <Form method="post" action="/logout">
                        <button
                          type="submit"
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-zinc-600 hover:text-blue-500 hover:bg-blue-50 transition-all"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </Form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-zinc-500 hover:text-blue-500 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75 transition-colors"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
          id="mobile-menu"
        >
          <nav className="flex flex-col space-y-1 py-4">
            {!currUser ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-3 rounded-lg text-zinc-700 hover:text-blue-500 hover:bg-blue-50 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-4 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-sm mx-1 my-1 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="font-medium truncate text-zinc-800">
                    {currUser.username}
                  </p>
                </div>
                <Link
                  to={`/user/${currUser.username}`}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-zinc-700 hover:text-blue-500 hover:bg-blue-50 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen size={18} />
                  <span>Your Library</span>
                </Link>

                <Form method="post" action="/logout">
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2 px-4 py-3 rounded-lg text-zinc-700 hover:text-blue-500 hover:bg-blue-50 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </Form>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
