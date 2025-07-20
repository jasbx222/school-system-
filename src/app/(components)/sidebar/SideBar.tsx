"use client";

import React, { useState } from "react";
import {
  Check,
  BookOpen,
  PencilRuler,
  PiggyBank,
  UserCheck,
  Menu,
  X,
} from "lucide-react";
import logo from "../../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const SideBar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const links = [
    { name: "الرئيسية", url: "/home", icon: BookOpen },
    { name: "إدارة الطلاب", url: "/students", icon: UserCheck },
    { name: "إدارة التفقد", url: "/attendance", icon: Check },
    { name: "المصاريف", url: "/expenses", icon: PiggyBank },
    { name: "الأقساط", url: "/installments", icon: PiggyBank },
    { name: "الخصومات", url: "/discounts", icon: PencilRuler },
  ];

  return (
    <>
      {/* زر فتح القائمة */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 right-4 z-50 bg-[#3B82F6] text-white p-3 rounded-full shadow-lg hover:bg-[#2563EB] transition-all"
          aria-label="فتح القائمة"
        >
          <Menu size={26} />
        </button>
      )}

      {/* القائمة الجانبية */}
      <aside
        className={clsx(
          "fixed top-0 right-0  rounded-2xl h-full w-64 bg-gradient-to-b from-[#0F1A35] via-[#142B56] to-[#3B82F6] text-white p-6 shadow-2xl transition-transform duration-300 z-40 flex flex-col",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* زر الإغلاق */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setOpen(false)}
            className="text-white hover:text-red-400 transition"
            aria-label="إغلاق القائمة"
          >
            <X size={28} />
          </button>
        </div>

        {/* الشعار مع تأثير نبض */}
        <div className="flex flex-col items-center mb-8 space-y-3">
          <Image
            src={logo}
            alt="Logo"
            width={80}
            height={80}
            className="rounded-full border-4 border-yellow-400 shadow-lg animate-pulse"
          />
          <h2 className="font-extrabold text-yellow-400 text-xl tracking-widest drop-shadow-lg">
            مدرسة المستقبل
          </h2>
          <p className="text-xs text-yellow-200 tracking-wide">
            نظام إدارة المدارس المتكامل
          </p>
        </div>

        {/* الروابط */}
        <nav className="flex-1">
          <ul className="space-y-4">
            {links.map((link, i) => {
              const isActive = pathname === link.url;
              const Icon = link.icon;

              return (
                <li key={i}>
                  <Link
                    href={link.url}
                    className={clsx(
                      "flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-semibold transition-all duration-200 group",
                      isActive
                        ? "bg-yellow-400 text-[#0F1A35] shadow-lg"
                        : "hover:bg-yellow-400/40 hover:text-yellow-300 text-yellow-100"
                    )}
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
          </ul>
        </nav>

        {/* التذييل */}
        <footer className="mt-8 text-center text-yellow-300 text-xs select-none">
          © جميع الحقوق محفوظة | مدرسة المستقبل 2025
        </footer>
      </aside>
    </>
  );
};

export default SideBar;
