"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { Github, LogOutIcon, Loader2 } from "lucide-react";
import { signIn, signOut } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { Session } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthButton({ session }: { session: Session | null }) {
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

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage
              src={session.user.image || ""}
              alt={session.user.name || ""}
            />
            <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{session.user.name || session.user.email?.split("@")[0]}</span>
        </div>

        <Button
          variant={"outline"}
          onClick={handleSignOut}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <LogOutIcon className="w-4 h-4 mr-2" />
          )}
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleSignIn} disabled={isPending}>
      {isPending ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Github className="w-4 h-4 mr-2" />
      )}
      {isPending ? "Redirecting..." : "Sign in with Github"}
    </Button>
  );
}
