"use client";

import React, { useActionState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createComment } from "@/app/features/create-comment/action";
import type { Session } from "@/lib/types";

export default function CommentForm({ session }: { session: Session | null }) {
  const [_state, formAction, isPending] = useActionState(createComment, null);

  if (!session) {
    return (
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <p className="text-muted-foreground">Sign in to leave a comment or send message</p>
        </CardContent>
      </Card>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === "Enter" || e.key === "NumpadEnter")) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      action={formAction}
    >
      <Textarea
        onKeyDown={handleKeyDown}
        placeholder="Leave a comment"
        className="min-h-[120px] resize-none"
        rows={4}
        name="content"
      />
      <Button
        type="submit"
        className="self-end"
        disabled={isPending}
      >
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit"}
      </Button>
    </form>
  );
}
