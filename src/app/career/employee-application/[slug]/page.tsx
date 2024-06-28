import EmployeeApplicationForm from "@/components/EmployeeApplicationForm";
import CallToAction from "@/partials/CallToAction";
import { getListPage } from "@/lib/contentParser";
import Image from "next/image";

const EmployeeApplication = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) => {
  const callToAction = getListPage("sections/call-to-action.md");
  const employee_application = getListPage("employee-application/_index.md");
  const { title, image, form_description } = employee_application.frontmatter;

  return (
    <>
      <section>
        <Image
          src={image}
          alt="Ninth Ave Foods Warehouse"
          className="w-full lg:h-64 md:48 h-40 object-cover object-center opacity-100"
          width={3908}
          height={1300}
          priority
        />
        <div className="text-center pb-8 pt-10">
          <h4 className=" text-dark-grey">{searchParams.jobTitle}</h4>
          <p className="text-dark-grey text-lg"> {searchParams.location}</p>
        </div>

        <div className="lg:col-8 md:col-11 col-9 mx-auto">
          <p className="mx-auto pb-10">{form_description}</p>
          <EmployeeApplicationForm
            jobPositionID={searchParams._id}
            jobPosition={searchParams.jobTitle}
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
