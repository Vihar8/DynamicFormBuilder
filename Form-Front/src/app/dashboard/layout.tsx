// app/dashboard/layout.tsx
"use client";

import AuthGuard from "../../utils/AuthGuard";
import LayoutAdmin from "../../layoutsAdmin/LayoutAdmin";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={[0]}>
      <LayoutAdmin>{children}</LayoutAdmin>
    </AuthGuard>
  );
}
