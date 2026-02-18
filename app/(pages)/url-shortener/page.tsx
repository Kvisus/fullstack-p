import { getSession } from "@/lib/dataAccessLayer";
import { getByUserId } from "@/app/entities/short-link/api";
import { isAdmin } from "@/lib/is-admin";
import { ShortenerForm } from "@/app/widgets/shortener-form";
import { ShortenerHistory } from "@/app/widgets/shortener-history";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield } from "lucide-react";
import { redirect } from "next/navigation";
import BackBtn from "@/components/BackBtn";

export default async function UrlShortenerPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const links = await getByUserId(session.user.id);
  const admin = await isAdmin(session);

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-3xl space-y-8">
      <BackBtn href="/" />
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">URL Shortener</h1>
          {admin && (
            <Button variant="outline" size="sm" asChild>
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
