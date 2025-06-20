"use client";

import { useEffect, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import JWTContext from "../contexts/JWTContext";

const AuthGuard = ({ children, allowedRoles }) => {
  const { isLoggedIn, user, isInitializing, logout } = useContext(JWTContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isInitializing) return;

    // // Not logged in
    // if (!isLoggedIn) {
    //   router.replace(`/?from=${pathname}`);
    // }

    // Logged in but role not allowed
    if (isLoggedIn && user && !allowedRoles.includes(user.role)) {
      logout(); // optional: logout if unauthorized
      router.replace("/dashboard"); // or home page
    }
  }, [isLoggedIn, allowedRoles, user?.role, pathname, isInitializing]);

  // Render children only if authenticated and authorized
  if (isInitializing) return null;
  if (isLoggedIn && allowedRoles.includes(user?.role)) {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;
