import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  return {
    id: Number(session.user.id),
    email: session.user.email!,
    role: (session.user as any).role,
  };
}

