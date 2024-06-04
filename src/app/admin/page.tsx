import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import AdminPanel from "@/components/AdminPanel";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import AdminSideBar from "@/partials/AdminSideBar";

export default async function Auth() {
  const session = await getServerSession(options);
  const data = getListPage("admin/_index.md");

  return (
    <>
      {session ? (
        <div>
          <PageHeader title={data.frontmatter.title} />
          <AdminPanel user={session?.user} pagetype={"Server"}></AdminPanel>
        </div>
      ) : (
        <h1 className="text-5xl">Not Authorized</h1>
      )}
    </>
  );
}
