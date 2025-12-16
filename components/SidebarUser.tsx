"use client";

import { useSession, signOut } from "next-auth/react";

export default function SidebarUser() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!session) return null;

  return (
    <div className="mt-6 rounded-lg border border-[#242427] bg-[#121218] p-3">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="h-9 w-9 rounded-full bg-linear-to-br from-[#8b5cf6] to-[#6366f1] flex items-center justify-center text-xs font-medium text-white">
          {user?.name?.slice(0, 2).toUpperCase() || "US"}
        </div>

        {/* Info */}
        <div className="flex flex-col leading-tight">
          <span className="text-sm text-[#e5e7eb]">{user?.name}</span>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-[11px] text-[#9ca3af] hover:text-[#e5e7eb] transition text-left"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
