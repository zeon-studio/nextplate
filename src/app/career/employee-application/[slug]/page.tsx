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

  console.log("DATA: ", searchParams);

  return (
    <>
      {/* <Image
        src={image}
        alt="Ninth Ave Foods Warehouse"
        className="w-full h-40 object-cover sm:object-[center_top] opacity-100 object-center"
        width={3908}
        height={1300} // Adjust the height to your desired value
        priority
      /> */}
      <section className="section-sm">
        <div className="text-center pb-8">
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
