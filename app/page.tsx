import GetStartedButton from "@/components/GetStarted";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes — Think. Write. Remember.",
  description: "Minimal notes app inspired by Obsidian",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f14] text-[#e5e7eb] flex items-center justify-center">
      <section className="max-w-4xl w-full px-6">
        <div className="bg-[#16161d] rounded-2xl shadow-xl p-10 md:p-14">
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Your thoughts.
              <span className="text-[#8b5cf6]"> Structured.</span>
            </h1>
            <p className="text-[#9ca3af] text-lg max-w-2xl">
              A minimal note-taking space. Write ideas,
              connect thoughts, keep everything in one place.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Feature
              title="Markdown First"
              description="Write notes the way developers think. Clean and readable."
            />
            <Feature
              title="Focus Mode"
              description="No noise. Just you and your thoughts."
            />
            <Feature
              title="Private by Design"
              description="Your notes stay yours. Create them only after registration."
            />
          </div>

          <footer className="flex flex-col sm:flex-row items-center gap-4">
            <GetStartedButton />

            <span className="text-sm text-[#9ca3af]">
              Registration required to create notes
            </span>
          </footer>
        </div>
      </section>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#0f0f14] rounded-xl p-6">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-[#9ca3af]">{description}</p>
    </div>
  );
}
