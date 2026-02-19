"use client";

import { useTransition } from "react";
import { Github, Loader2, LockIcon } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { toast } from "sonner";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = () => {
    startTransition(async () => {
      await signIn.social({ provider: "github" });
      toast.success("Signed in successfully");
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="items-center">
          <div className="bg-muted mb-2 flex size-12 items-center justify-center rounded-full">
            <LockIcon className="text-muted-foreground size-5" />
          </div>
          <DialogTitle>Sign in required</DialogTitle>
          <DialogDescription>You need to sign in to access this page</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={handleSignIn}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : <Github className="size-4" />}
            {isPending ? "Redirecting..." : "Sign in with GitHub"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
