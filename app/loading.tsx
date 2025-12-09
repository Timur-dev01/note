import { LoaderPinwheel } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent p-6">
      <div className="flex flex-col items-center gap-8">
        <div className="w-full max-w-md rounded-2xl bg-[#1e1b22] p-6 shadow-lg">
          <div className="space-y-4 animate-pulse">
            <div className="h-6 w-2/3 rounded-xl bg-gray-200" />
            <div className="h-4 w-full rounded-xl bg-gray-200" />
            <div className="h-4 w-4/5 rounded-xl bg-gray-200" />
            <div className="h-4 w-3/5 rounded-xl bg-gray-200" />
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <LoaderPinwheel className="h-6 w-6 animate-spin" />
          <span className="text-lg font-medium">Загрузка страницы…</span>
        </div>
      </div>
    </div>
  );
}
