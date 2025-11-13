import { Suspense } from "react";
import Navbar from "./Navbar";
import PageLoader from "./PageLoader";
import { Outlet } from "react-router";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Layout;
