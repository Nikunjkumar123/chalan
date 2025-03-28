"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./component/header/page";
import { Toaster } from "react-hot-toast";
import { AuthContext, AuthProvider } from "./component/context/AuthContext.js";
import { useContext } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  // frontend is created by shahbaz
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

// Separate component to access AuthContext
const MainLayout = ({ children }) => {
  const { token, loading } = useContext(AuthContext); 

  if (loading) return null; 

  return (
    <>
      {token && <Header />}
      {children}
    </>
  );
};
