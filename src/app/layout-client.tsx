"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import SideBar from "./(components)/sidebar/SideBar";
import "./globals.css";
import { getDecryptedToken } from "./hooks/useDelete";
import LoginPage from "./(auth)/login/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const token = getDecryptedToken();
    if (!token) {
      router.push("/login");
    } else {
      setIsVerified(true);
    }
  }, []);

  if (!isVerified) {
    return null; 
  }

  return (

      <div className="flex h-screen">
        <SideBar />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">{children}</main>
      </div>

  );
}
