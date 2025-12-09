import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Posts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 font-(family-name:var(--font-geist-sans))">
        Posts
      </h1>
      <ul className="font-(family-name:--font-geist-sans) max-w-2xl space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="block border rounded-xl border-[#242427] py-5 px-10"
          >
            <Link href={`/blog/posts/${post.id}`}>
              <h3 className="font-semibold text-xl mb-5">{post.title}</h3>
              <p>
                {post.content
                  ? post.content.length > 30
                    ? post.content.slice(0, 30) + "…"
                    : post.content
                  : "No content available."}
              </p>
              <div className="flex items-end justify-end">
                <span className="text-sm text-gray-600 ml-2">
                  by {post.author.name}
                </span>
                <span className="text-sm text-gray-600 ml-2">
                  {post.author.email}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
