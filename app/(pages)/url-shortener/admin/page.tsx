import { getSession } from "@/lib/dataAccessLayer";
import { getAll } from "@/app/entities/short-link/api";
import { isAdmin } from "@/lib/is-admin";
import { ShortLinksAdminTable } from "@/app/widgets/short-links-admin-table";
import { redirect } from "next/navigation";
import LinkBtn from "@/components/LinkBtn";

export default async function UrlShortenerAdminPage() {
  const session = await getSession();

  if (!session || !(await isAdmin(session))) {
    redirect("/url-shortener");
  }

  const links = await getAll();

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-5xl space-y-8">
        <LinkBtn href="/url-shortener" />
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Admin — All Short Links</h1>
        </div>

        <ShortLinksAdminTable links={links} />
      </div>
    </main>
  );
}
