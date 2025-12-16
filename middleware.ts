import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Middleware intentionally disabled. Admin protection is enforced server-side in layouts and API routes.
export async function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
