import PageHeader from "@/partials/PageHeader";
import { getListPage } from "@/lib/contentParser";
import AdminSideBar from "@/partials/AdminSideBar";

const JobPostings = () => {
  const data = getListPage("admin/create-job-application.md");
  return (
    <>
      <section className="section-md">
        <PageHeader title={data.frontmatter.title} />
        <AdminSideBar></AdminSideBar>
        <div className="container pb-14"></div>
      </section>
    </>
  );
};

export default JobPostings;
