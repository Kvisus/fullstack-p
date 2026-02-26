import { getSession } from "@/lib/dataAccessLayer";
import { isAdmin } from "@/lib/is-admin";
import { getMyShortLinks } from "@/entities/short-link/api";
import { ShortenerForm } from "@/widgets/shortener-form";
import { ShortenerHistory } from "@/widgets/shortener-history";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield } from "lucide-react";
import { redirect } from "next/navigation";
import LinkBtn from "@/components/LinkBtn";

export default async function UrlShortenerPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const [links, admin] = await Promise.all([
    getMyShortLinks(),
    isAdmin(session),
  ]);

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <LinkBtn href="/" />
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">URL Shortener</h1>
          {admin && (
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <Link href="/url-shortener/admin">
                <Shield className="size-4" />
                Admin
              </Link>
            </Button>
          )}
        </div>

        <ShortenerForm />
        <ShortenerHistory links={links} />
      </div>
    </main>
  );
}
