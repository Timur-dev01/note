import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ backgroundColor: "transparent", color: "#fff" }}
    >
      <div className="max-w-md">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: "#fff" }}>
          Страница не найдена
        </h2>

        <Link
          href="/"
          className="px-6 py-3 rounded-xl font-medium transition-all"
          style={{
            backgroundColor: "#1e1b22",
            color: "#fff",
            border: "1px solid #1d1a20",
          }}
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
