import Link from "next/link";
import React from "react";

interface layoutProps {
	children: React.ReactNode;
}

export default function layout({ children }: layoutProps) {
	return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-[#1b1b1d] p-6 space-y-4">
        <nav className="flex flex-col space-y-3">
          <Link
            href="/blog"
            className="text-lg font-semibold text-[#ffffff] hover:text-[#d4d4d7] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/blog/posts"
            className="text-lg font-semibold text-[#ffffff] hover:text-[#d4d4d7] transition-colors"
          >
            Posts
          </Link>
          <Link
            className="text-lg font-semibold text-[#ffffff] hover:text-[#d4d4d7] transition-colors"
            href="/blog/posts/new"
          >
            Create new post
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
