import EmployeeApplicationForm from "@/components/EmployeeApplicationForm";
import CallToAction from "@/partials/CallToAction";
import { getListPage } from "@/lib/contentParser";
import Image from "next/image";
import { getEmployeePageContent } from "@/app/sanity/sanity.query";

const EmployeeApplication = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) => {
  const data = await getEmployeePageContent();
  // console.log("Data: ", data);
  const callToAction = {
    frontmatter: {
      enable: true,
      title: "Connect to learn more about partnership opportunities",
      image: "/images/call-to-action.png",
      description:
        "To inquire about our current packaging capabilities for fluid packaging, yogurt packaging, sour cream packaging, and ice-cream and dairy-alternative packaging, connect with us.",
      button: {
        enable: true,
        label: "Contact Us",
        link: "/contact",
      },
    },
  };

  return (
    <>
      <section>
        <Image
          src={data.imageUrl}
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
          <p className="mx-auto pb-10">{data.formDescription}</p>
          <EmployeeApplicationForm
            jobPositionID={searchParams._id}
            jobPosition={searchParams.jobTitle}
          ></EmployeeApplicationForm>
        </div>

        <div className="py-20">
          <CallToAction data={callToAction}></CallToAction>
        </div>
      </section>
    </>
  );
};

export default EmployeeApplication;
