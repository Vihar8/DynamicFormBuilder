"use client";

import { usePathname } from "next/navigation";
import Layout from "../layouts/Layout";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/dashboard");

  return isAdminRoute ? <>{children}</> : <Layout>{children}</Layout>;
}
