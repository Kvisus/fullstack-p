"use client";

import { useActionState } from "react";
import { createShortLinkFeature } from "@/app/features";
import type { CreateShortLinkState } from "@/app/features/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Link, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ShortenerForm() {
  const [state, formAction, isPending] = useActionState<CreateShortLinkState, FormData>(createShortLinkFeature, null);

  const shortUrl = state?.success && state.slug ? `${window.location.origin}/go/${state.slug}` : null;

  const handleCopy = async () => {
    if (!shortUrl) return;
    await navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="size-5" />
          Shorten a URL
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          action={formAction}
          className="flex gap-2"
        >
          <Input
            name="url"
            type="url"
            placeholder="https://example.com/very-long-url"
            required
            disabled={isPending}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : "Shorten"}
          </Button>
        </form>

        {state?.error && <p className="text-destructive text-sm">{state.error}</p>}

        {shortUrl && (
          <div className="bg-muted/50 flex items-center gap-2 rounded-md border p-3">
            <code className="flex-1 truncate text-sm">{shortUrl}</code>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleCopy}
            >
              <Copy className="size-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
