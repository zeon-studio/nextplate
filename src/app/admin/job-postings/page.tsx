import PageHeader from "@/partials/PageHeader";
import { getListPage } from "@/lib/contentParser";
import AdminSideBar from "@/partials/AdminSideBar";
import EditableCard from "@/components/EditableCard";

const JobPostings = () => {
  const data = getListPage("admin/job-postings.md");
  return (
    <>
      <section className="section-md">
        <PageHeader title={data.frontmatter.title} />
        <AdminSideBar></AdminSideBar>
        <div className="container pb-14"></div>

        <EditableCard></EditableCard>
      </section>
    </>
  );
};

export default JobPostings;
