"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";

function ClientLayout({ children }) {
  const pathname = usePathname();

  const isAuthPage = ["/login", "/signup", "/profile"].includes(pathname);

  return (
    <>
      {!isAuthPage ? <Navigation /> : null}
      <main
        className={`mx-auto ${
          pathname === "/profile" ? "" : "sm:px-2 md:px-8"
        } w-full min-h-[1000px]`}
      >
        {children}
      </main>
      ;
    </>
  );
}

export default ClientLayout;
