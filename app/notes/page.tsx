import { getCurrentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NotesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/api/auth/signin");

  const notes = await prisma.note.findMany({
    where: {
      authorId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (notes.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-2">No notes yet</h2>
          <p className="text-sm text-[#9ca3af]">
            Create your first note and start building your knowledge base.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-4">
      {notes.map((note) => (
        <Link
          key={note.id}
          href={`/notes/${note.id}`}
          className="
            block rounded-lg border border-[#242427]
            bg-[#0f0f14] px-10 py-4
            hover:bg-[#18181c] transition
          "
        >
          <h3 className="text-lg font-medium">{note.title}</h3>
          <p className="text-sm text-[#9ca3af] line-clamp-2">{note.content}</p>
        </Link>
      ))}
    </div>
  );
}
