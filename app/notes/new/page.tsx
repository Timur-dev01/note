import Form from "next/form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";

export default function NewNote() {
  async function createNote(formData: FormData) {
    "use server";
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await prisma.note.create({
      data: {
        title,
        content,
        authorId: user.id,
      },
    });

    revalidatePath("/notes");
    redirect("/notes");
  }

  return (
    <>
      {/* Actions */}
      <div
        className="
          fixed top-6 right-6 z-50
          flex items-center gap-3
          px-4 py-2
        "
      >
        <button
          type="submit"
          form="new-note-form"
          className="
            rounded-md bg-[#1f1f21]
            border border-[#2c2c2f]
            px-4 py-1.5 text-sm
            text-[#e5e7eb]
            hover:bg-[#2a2a2d]
            transition
          "
        >
          Save
        </button>
      </div>

      {/* Editor */}
      <div className="h-screen py-10 mx-auto max-w-5xl">
        <Form id="new-note-form" action={createNote} className="space-y-6">
          <input
            name="title"
            placeholder="Untitled note"
            className="
              w-full bg-transparent
              text-3xl font-semibold
              placeholder:text-[#6b7280]
              focus:outline-none
            "
          />

          <textarea
            name="content"
            placeholder="Start writing..."
            rows={16}
            className="
              w-full resize-none bg-transparent
              text-base leading-relaxed
              placeholder:text-[#6b7280]
              focus:outline-none
            "
          />
        </Form>
      </div>
    </>
  );
}
