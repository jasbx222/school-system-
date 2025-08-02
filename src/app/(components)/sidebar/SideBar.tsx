"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  PencilRuler,
  PiggyBank,
  UserCheck,
  Menu,
  School,
  X,
  CircleCheck,
  BadgePercent,
} from "lucide-react";
import logo from "../../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Links from "./Links";
import { getDecryptedToken } from "@/app/hooks/useDelete";
import useGetOffer from "@/app/hooks/useGetOffer";
import { ProfileResponse } from "@/app/types/types";

const SideBar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const token = getDecryptedToken();
  const { data: profile, loading } = useGetOffer<ProfileResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}profile`
  );

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function formatDate(dateString: string | undefined) {
    if (!dateString) return "تاريخ غير متوفر";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ar-EG", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(date);
  }

  const links = [
    { name: "الرئيسية", url: "/home", icon: BookOpen },
    { name: "إدارة الطلاب", url: "/students", icon: UserCheck },
    { name: "إدارة التفقد", url: "/attendance", icon: CircleCheck },
    { name: "المصاريف", url: "/expenses", icon: PiggyBank },
    { name: "الصفوف", url: "/classes", icon: School },
    { name: "الخصومات", url: "/discounts", icon: BadgePercent },
  ];

  if (token === null) return null;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 right-4 z-50 bg-[#3B82F6] text-white p-3 rounded-full shadow-lg hover:bg-[#2563EB] transition-all sm:hidden"
          aria-label="فتح القائمة"
        >
          <Menu size={26} />
        </button>
      )}

      <aside
        className={clsx(
          "fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-[#0F1A35] via-[#142B56] to-[#3B82F6] text-white p-6 shadow-2xl flex flex-col transition-transform duration-300 z-40",
          open ? "translate-x-0" : "translate-x-full",
          "sm:translate-x-0 sm:static sm:h-auto sm:w-64"
        )}
        id="sidebar"
      >
        <div className="flex justify-end mb-6 md:hidden">
          <button
            onClick={() => setOpen(false)}
            className="text-white hover:text-red-400 transition"
            aria-label="إغلاق القائمة"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col items-center mb-8 space-y-3">
          <div className="w-46 h-16 rounded-xl bg-yellow-400 text-[#0F1A35] flex items-center justify-center text-xl font-bold border-4 border-yellow-300 shadow-lg animate-pulse">
            {profile?.profile?.name || "مدرسة"}
          </div>

          <p className="text-sm text-red-600 bg-yellow-100 border border-red-500 rounded-md px-3 py-2 mt-4 w-fit shadow-sm">
            <span className="font-medium">انتهاء صلاحية الحساب:</span>{" "}
            {formatDate(profile?.profile?.expires_at)}
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-none scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-yellow-200/20 smooth-scroll">
          <ul className="space-y-4">
            {links.map((link, i) => {
              const isActive = pathname === link.url;
              const Icon = link.icon;
              return (
                <li key={i}>
                  <Link
                    href={link.url}
                    className={clsx(
                      "flex items-center gap-4 px-5 py-3 rounded-xl font-semibold transition-all duration-200 group",
                      isActive
                        ? "bg-yellow-400 text-[#0F1A35] shadow-lg"
                        : "hover:bg-yellow-400/40 hover:text-yellow-300 text-yellow-100"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <Icon
                      size={24}
                      className={clsx(
                        "transition-transform",
                        isActive ? "text-[#0F1A35]" : "group-hover:scale-110"
                      )}
                    />
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}

            <Links />
          </ul>
        </nav>

        <footer className="mt-6 text-center text-yellow-300 text-[11px] border-t border-yellow-300/30 pt-4">
          © 2025 {profile?.profile?.name}|| جميع الحقوق محفوظة
        </footer>
      </aside>
    </>
  );
};

export default SideBar;
