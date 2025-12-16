"use client";

import { signIn } from "next-auth/react";

export default function GetStartedButton() {
  return (
    <button
      onClick={() =>
        signIn(undefined, {
          callbackUrl: "/notes",
        })
      }
      className="px-6 py-3 rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors font-medium"
    >
      Get Started
    </button>
  );
}
