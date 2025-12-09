import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Post({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const id = Number((await params).id);

	const post = await prisma.post.findUnique({
		where: { id },
		include: {
			author: true,
		},
	});

	if (!post) {
		notFound();
	}

	return (
    <div>
      <article className="w-full max-w-2xl space-y-4 font-(family-name:--font-geist-sans) border rounded-xl border-[#242427] p-10">
        <h1 className="text-4xl font-bold mb-8 text-[#e5e5e7]">{post.title}</h1>
        <div className="prose prose-gray mt-8 wrap-break-word">
          {post.content || "No content available."}
        </div>
        <p className="text-gray-600 text-end">by {post.author.name}</p>
      </article>
    </div>
  );
}
