"use client";

import { useTransition, useState } from "react";
import { deleteShortLinkFeature, renameShortLinkFeature } from "@/features";
import type { ShortLinkDTO } from "@/entities/short-link/model/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Trash2, Pencil, Check, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";

function ShortLinkRow({ link }: { link: ShortLinkDTO }) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [newSlug, setNewSlug] = useState(link.slug);

  const shortUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/go/${link.slug}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard");
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteShortLinkFeature(link.slug);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Link deleted");
      }
    });
  };

  const handleRename = () => {
    if (!newSlug || newSlug === link.slug) {
      setIsEditing(false);
      return;
    }
    startTransition(async () => {
      const result = await renameShortLinkFeature(link.slug, newSlug);
      if (result.error) {
        toast.error(result.error);
        setNewSlug(link.slug);
      } else {
        toast.success("Slug updated");
      }
      setIsEditing(false);
    });
  };

  return (
    <div
      className="flex items-center gap-3 rounded-md border p-3 transition-opacity data-[pending=true]:opacity-50"
      data-pending={isPending}
    >
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-sm">/go/</span>
            <Input
              value={newSlug}
              onChange={e => setNewSlug(e.target.value)}
              className="h-7 w-32 text-sm"
              autoFocus
              onKeyDown={e => {
                if (e.key === "Enter") handleRename();
                if (e.key === "Escape") {
                  setNewSlug(link.slug);
                  setIsEditing(false);
                }
              }}
            />
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleRename}
              disabled={isPending}
            >
              <Check className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                setNewSlug(link.slug);
                setIsEditing(false);
              }}
            >
              <X className="size-3.5" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <code className="text-sm font-medium">/go/{link.slug}</code>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        )}
        <p className="text-muted-foreground mt-0.5 truncate text-xs">{link.url}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleCopy}
          title="Copy"
        >
          <Copy className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setIsEditing(true)}
          title="Rename"
          disabled={isPending}
        >
          <Pencil className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleDelete}
          title="Delete"
          disabled={isPending}
        >
          <Trash2 className="text-destructive size-3.5" />
        </Button>
      </div>
    </div>
  );
}

export function ShortenerHistory({ links }: { links: ShortLinkDTO[] }) {
  if (links.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Links</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">No links yet. Create your first short link above.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Links ({links.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {links.map(link => (
          <ShortLinkRow
            key={link.id}
            link={link}
          />
        ))}
      </CardContent>
    </Card>
  );
}
