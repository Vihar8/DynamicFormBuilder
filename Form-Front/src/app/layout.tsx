"use client"
// src/app/layout.tsx
import "../styles/index.scss";
import { FormProvider } from "./components/FormContext";
import { JWTProvider } from "../contexts/JWTContext";
import { SnackbarProvider } from "../utils/SnackbarProvider";
import ClientLayout from "./ClientLayout";
// Your custom layout wrapper

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SnackbarProvider>
          <JWTProvider>
            <FormProvider>
              <ClientLayout>{children}</ClientLayout>
            </FormProvider>
          </JWTProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
