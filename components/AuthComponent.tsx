"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function AuthComponent() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!session) {
    return (
      <Button className="bg-[#1c1c1c] hover:bg-transparent text-center" variant="outline" size="sm" onClick={() => signIn()}>
        Войти
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 focus-visible:outline-none border-transparent! border-0 transition-al px-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
            <AvatarFallback className="text-xs bg-white/20 text-white">
              {user?.name?.slice(0, 2).toUpperCase() || "US"}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-white hidden sm:inline">
            {user?.name || "Пользователь"}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 border-none bg-transparent shadow-none backdrop-blur-xl"
      >
        <div className="backdrop-blur-xl">
          <DropdownMenuItem className="flex flex-col items-start gap-1.5 cursor-default rounded-t-lg focus:bg-white/10 hover:bg-white/10 transition-colors">
            <span className="font-semibold text-white">
              {user?.name || "Пользователь"}
            </span>
            <span className="text-xs text-white/70">{user?.email}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-white/10" />

          <DropdownMenuItem
            onClick={() => signOut()}
            className="rounded-b-lg text-red-400 focus:bg-red-500/20 focus:text-red-300 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Выйти
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
