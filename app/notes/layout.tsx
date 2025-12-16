"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import { FileText, Plus } from "lucide-react";
import SidebarUser from "@/components/SidebarUser";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e5e7eb] flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-72
          bg-[#16161d] border-r border-[#242427]
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0
        `}
      >
        <div className="flex h-full flex-col p-5">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-2"></div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            <Link
              href="/notes"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#d4d4d8] hover:bg-white/5"
            >
              <FileText size={16} />
              All notes
            </Link>

            <Link
              href="/notes/new"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#d4d4d8] hover:bg-white/5"
            >
              <Plus size={16} />
              New note
            </Link>
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer */}
          <SidebarUser />
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}

      {/* Main area */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header className="md:hidden flex items-center gap-3 border-b border-[#242427] bg-[#0f0f14] px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#e5e7eb]"
          >
            <HiMenu size={22} />
          </button>
          <span className="text-sm font-medium">Notes</span>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
