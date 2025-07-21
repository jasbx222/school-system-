import { PencilRuler } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import clsx from "clsx";
const Links = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
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
        <PencilRuler
          size={24}
          className={clsx(
            "transition-transform",
            settingsOpen ? "text-[#0F1A35]" : "group-hover:scale-110"
          )}
        />
        <span>الإعدادات</span>
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

    {/* القائمة المنسدلة */}
    {settingsOpen && (
      <ul className="mt-2 space-y-2 px-6 text-sm text-yellow-100 animate-fade-in-down">
        <li>
          <Link
            href="/sections"
            className="block px-3 py-2 rounded hover:bg-yellow-400/30 transition"
          >
          الشعب
          </Link>
        </li>
        <li>
          <Link
            href="/costs"
            className="block px-3 py-2 rounded hover:bg-yellow-400/30 transition"
          >
            تكاليف الفصول الدراسية 
          </Link>
        </li>
        <li>
          <Link
            href="/class_section"
            className="block px-3 py-2 rounded hover:bg-yellow-400/30 transition"
          >
             الفصول الدراسية 
          </Link>
        </li>
      </ul>
    )}
  </div>
</li>
  )
}

export default Links