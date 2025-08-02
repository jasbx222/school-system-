"use client";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { getDecryptedToken } from "@/app/hooks/useDelete";
import { useRouter } from "next/navigation";

const Links = () => {
  const navigate = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleLogout = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}logout`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + getDecryptedToken(),
        },
      })
      .then(() => {
        localStorage.clear();
        navigate.push("/login");
      })
      .catch(console.log);
  };

  const menuItems = [
    { name: "الشعب", href: "/sections", type: "link" },
    { name: "الفصول الدراسية", href: "/semesters", type: "link" },
    { name: "الاقساط", href: "/installments", type: "link" },
    { name: "النتائج", href: "/results", type: "link" },
    { name: "المواد", href: "/subjects", type: "link" }, 
    { name: "تسجيل الخروج", type: "button", action: handleLogout },
  ];

  return (
    <li>
      <div className="relative">
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className={clsx(
            "flex items-center justify-between gap-4 px-5 py-3 w-full rounded-xl text-lg font-semibold transition-all duration-200 group",
            settingsOpen
              ? "bg-yellow-400 text-[#0F1A35] shadow-lg"
              : "hover:bg-yellow-400/40 hover:text-yellow-300 text-yellow-100"
          )}
        >
          <div className="flex items-center gap-4">
            <MoreHorizontal
              size={24}
              className={clsx(
                "transition-transform",
                settingsOpen ? "text-[#0F1A35]" : "group-hover:scale-110"
              )}
            />
            <span>المزيد</span>
          </div>
          <svg
            className={clsx(
              "w-4 h-4 transition-transform duration-200",
              settingsOpen ? "rotate-180" : "rotate-0"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {settingsOpen && (
          <ul className="mt-2 space-y-2 px-6 text-sm text-yellow-100 animate-fade-in-down">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.type === "link" ? (
                  <Link
                    href={item.href ?? "#"}
                    className="block px-3 py-2 rounded hover:bg-yellow-400/30 transition"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={item.action}
                    className="block w-full text-right px-3 py-2 rounded hover:bg-red-400/30 text-red-500 transition"
                  >
                    {item.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

export default Links;
