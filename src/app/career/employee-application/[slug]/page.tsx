import EmployeeApplicationForm from "@/components/EmployeeApplicationForm";
import Image from "next/image";
import {
  getEmployeePageContent,
  getJobSanpshot,
} from "@/app/sanity/sanity.query";

const EmployeeApplication = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) => {
  const employeeApplication = await getEmployeePageContent();
  const jobSnapshot = await getJobSanpshot(searchParams._id);

  return (
    <>
      <section>
        <div className="relative w-full">
          <div className="w-full lg:h-64 md:h-48 h-40 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10"></div>
            <Image
              src={employeeApplication.imageUrl}
              alt="Ninth Ave Foods Warehouse"
              className="w-full lg:h-64 md:h-48 h-40 object-cover object-center"
              width={1839}
              height={677}
            />
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          {/* Centered text */}
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <h1 className="text-white font-primary">Employment Application</h1>
          </div>
        </div>

        <div className="text-center pb-8 pt-10">
          <h4 className=" text-dark-grey">{searchParams.jobTitle}</h4>
          <p className="text-dark-grey text-lg"> {searchParams.location}</p>
        </div>

        <div className="lg:col-8 md:col-11 col-9 mx-auto">
          <p className="mx-auto pb-10">{employeeApplication.formDescription}</p>
          <p className="text-dark-grey pb-10">
            <span className="font-bold">Job Description: </span>
            {searchParams.jobDescription}
          </p>
          <EmployeeApplicationForm
            jobPositionID={searchParams._id}
            jobTitle={jobSnapshot.jobTitle}
            jobLocation={jobSnapshot.jobLocation}
          ></EmployeeApplicationForm>
        </div>
      </section>
    </>
  );
};

export default EmployeeApplication;
