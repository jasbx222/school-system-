"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import SideBar from "./(components)/sidebar/SideBar";
import "./globals.css";
import { getDecryptedToken } from "./hooks/useDelete";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    // لا تتحقق من التوكن داخل صفحة تسجيل الدخول
    if (pathname === "/login") {
      setIsVerified(true);
      return;
    }

    const token = getDecryptedToken();
    if (!token) {
      router.replace("/login");
      setIsVerified(false);
    } else {
      setIsVerified(true);
    }
  }, [pathname]);

  if (isVerified === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-gray-500">جاري التحقق  ...</p>
      </div>
    );
  }

  if (!isVerified) return null;


  const isLoginPage = pathname === "/login";

  return (
    <div className="flex h-screen">
      {!isLoginPage && <SideBar />}
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">{children}</main>
    </div>
  );
}
