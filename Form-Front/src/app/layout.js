import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/index.scss";
import { FormProvider } from "./components/FormContext";
import Navbar from './components/Navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dynamic Form",
  description: "Dynamic Form Builder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
           <FormProvider>
            <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">
            Dynamic Form Generator
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Build custom forms with ease — single or multi-step, with various field types
          </p>
          <Navbar />
           {children}
            </div>
      </div>
           </FormProvider>
      </body>
    </html>
  );
}
