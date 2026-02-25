"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Github, LogOutIcon, Loader2, ChevronDown } from "lucide-react";
import { signIn, signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";

export default function UserMenu() {
  const { data: session, isPending: isSessionLoading } = useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignIn = () => {
    startTransition(async () => {
      await signIn.social({ provider: "github" });
      toast.success("Signed in successfully");
    });
  };

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut();
      toast.success("Signed out successfully");
      router.refresh();
    });
  };

  if (isSessionLoading) {
    return <div className="bg-muted size-8 animate-pulse rounded-full" />;
  }

  if (!session?.user) {
    return (
      <Button
        size="sm"
        onClick={handleSignIn}
        disabled={isPending}
      >
        {isPending ? <Loader2 className="size-4 animate-spin" /> : <Github className="size-4" />}
        <span className="hidden sm:inline">{isPending ? "Redirecting..." : "Sign in"}</span>
      </Button>
    );
  }

  const displayName = session.user.name || session.user.email?.split("@")[0] || "User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="gap-2 px-2"
        >
          <Avatar className="size-7">
            <AvatarImage
              src={session.user.image || ""}
              alt={displayName}
            />
            <AvatarFallback className="text-xs">{displayName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <ChevronDown className="text-muted-foreground size-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48"
      >
        <DropdownMenuLabel className="font-normal">
          <p className="truncate text-sm font-medium">{displayName}</p>
          {session.user.email && <p className="text-muted-foreground truncate text-xs">{session.user.email}</p>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={isPending}
          variant="destructive"
        >
          {isPending ? <Loader2 className="size-4 animate-spin" /> : <LogOutIcon className="size-4" />}
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
