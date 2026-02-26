"use client";

import { useTransition, useState } from "react";
import { deleteShortLinkFeature, renameShortLinkFeature } from "@/features";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Trash2, Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";
import type { AdminShortLinkDTO } from "@/entities/short-link/model/types";

function AdminRow({ link }: { link: AdminShortLinkDTO }) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [newSlug, setNewSlug] = useState(link.slug);

  const handleCopy = async () => {
    const shortUrl = `${window.location.origin}/go/${link.slug}`;
    await navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard");
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteShortLinkFeature(link.slug);
      if (result.error) toast.error(result.error);
      else toast.success("Link deleted");
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
    <tr
      className="border-b transition-opacity last:border-0 data-[pending=true]:opacity-50"
      data-pending={isPending}
    >
      <td className="px-4 py-3">
        {isEditing ? (
          <div className="flex items-center gap-1">
            <Input
              value={newSlug}
              onChange={e => setNewSlug(e.target.value)}
              className="h-7 w-28 text-sm"
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
          <code className="text-sm">/go/{link.slug}</code>
        )}
      </td>
      <td className="text-muted-foreground max-w-[200px] truncate px-4 py-3 text-sm">{link.url}</td>
      <td className="px-4 py-3 text-sm">{link.ownerName}</td>
      <td className="text-muted-foreground px-4 py-3 text-sm">{new Date(link.createdAt).toLocaleDateString()}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
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
      </td>
    </tr>
  );
}

export function ShortLinksAdminTable({ links }: { links: AdminShortLinkDTO[] }) {
  if (links.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>All Short Links</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">No links found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Short Links ({links.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-muted-foreground border-b text-sm font-medium">
                <th className="px-4 py-2">Slug</th>
                <th className="px-4 py-2">URL</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Created</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map(link => (
                <AdminRow
                  key={link.id}
                  link={link}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
