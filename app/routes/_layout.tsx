import { Outlet } from "react-router";
import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";

export default function Layout() {
  return (
    <div className="font-sans bg-white text-gray-800">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
