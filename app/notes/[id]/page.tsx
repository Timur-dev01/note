export const runtime = "nodejs";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/current-user";

export default async function NotePage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/api/auth");
  const id = Number((await params).id);

  const note = await prisma.note.findUnique({
    where: {
      id,
      authorId: user.id,
    },
  });

  if (!note) notFound();

  async function updateNote(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await prisma.note.update({
      where: {
        id,
        authorId: user.id,
      },
      data: { title, content },
    });

    revalidatePath("/notes");
    redirect("/notes");
  }

  async function deleteNote() {
    "use server";

    await prisma.note.delete({
      where: {
        id,
        authorId: user.id,
      },
    });

    revalidatePath("/notes");
    redirect("/notes");
  }

  return (
    <>
      {/* Actions */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <button
          form="edit-note-form"
          type="submit"
          className="px-4 py-2 rounded bg-[#1f1f21]"
        >
          Save
        </button>

        <form action={deleteNote}>
          <button className="px-4 py-2 rounded bg-red-600">Delete</button>
        </form>
      </div>

      {/* Editor */}
      <div className="max-w-5xl mx-auto py-10">
        <form id="edit-note-form" action={updateNote} className="space-y-6">
          <input
            name="title"
            defaultValue={note.title}
            className="w-full bg-transparent text-3xl focus:outline-none"
          />

          <textarea
            name="content"
            defaultValue={note.content}
            rows={16}
            className="w-full bg-transparent resize-none focus:outline-none"
          />
        </form>
      </div>
    </>
  );
}
