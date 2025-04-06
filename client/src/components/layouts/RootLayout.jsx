import { Outlet } from "react-router";
import Header from "../Header";
import Sidebar from "../Sidebar";
import useAuthStore from "../../stores/authStore";
import GraphPaperBackground from "../GraphPaperBackground";

function RootLayout() {
  const currUser = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen flex flex-col font-inter text-zinc-300 relative">
      <div className="absolute inset-0 z-0">
        <GraphPaperBackground />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full pt-16 md:pt-20">
          {currUser ? (
            <>
              <div className="hidden md:block">
                <Sidebar />
              </div>
              <div className="content-wrapper">
                <Outlet />
              </div>
            </>
          ) : (
            <div>
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
