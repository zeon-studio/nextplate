import EmployeeApplicationForm from "@/components/EmployeeApplicationForm";
import PageHeader from "@/partials/PageHeader";
import CallToAction from "@/partials/CallToAction";
import { getListPage } from "@/lib/contentParser";

const EmployeeApplication = () => {
  const callToAction = getListPage("sections/call-to-action.md");
  const employee_application = getListPage("employee-application/_index.md");
  const { title, form_description } = employee_application.frontmatter;

  return (
    <>
      <PageHeader title={title} />
      <section className="section-sm">
        <p className="col-8 mx-auto pb-10">{form_description}</p>
        <EmployeeApplicationForm></EmployeeApplicationForm>

        <div className="pt-20">
          <CallToAction data={callToAction}></CallToAction>
        </div>
      </section>
    </>
  );
};

export default EmployeeApplication;
