import { Outlet } from "react-router";
import Header from "../Header";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-black text-zinc-300">
      <Header />
      <main className="flex-1 w-full pt-16 md:pt-20">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
