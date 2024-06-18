import EmployeeApplicationForm from "@/components/EmployeeApplicationForm";
import PageHeader from "@/partials/PageHeader";
import CallToAction from "@/partials/CallToAction";
import { getListPage } from "@/lib/contentParser";
import { decodeSlugify } from "@/lib/utils/textConverter";
// import { useRouter } from "next/router";

const EmployeeApplication = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) => {
  const callToAction = getListPage("sections/call-to-action.md");
  const employee_application = getListPage("employee-application/_index.md");
  const { title, form_description } = employee_application.frontmatter;

  console.log("DATA: ", searchParams);

  return (
    <>
      {/* <PageHeader title={title} /> */}

      <section className="section-sm">
        <div className="text-center pb-8">
          <h4 className=" text-dark-grey">{searchParams.jobTitle}</h4>
          <p className="text-dark-grey text-lg"> {searchParams.location}</p>
        </div>

        <div className="lg:col-8 md:col-11 col-9 mx-auto">
          <p className="mx-auto pb-10">{form_description}</p>
          <EmployeeApplicationForm
            jobPositionID={searchParams._id}
          ></EmployeeApplicationForm>
        </div>

        <div className="pt-20">
          <CallToAction data={callToAction}></CallToAction>
        </div>
      </section>
    </>
  );
};

export default EmployeeApplication;
