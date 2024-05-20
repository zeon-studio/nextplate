"use client";
import { useInView } from "react-intersection-observer";
import {
  Point_of_contact_email,
  Point_of_contact_locations,
  Point_of_contact_call,
} from "@/types";

interface PageData {
  frontmatter: {
    enable?: boolean;
    enableEmailIcon?: boolean;
    enableLocationIcon?: boolean;
    enableCallIcon?: boolean;

    pointOfContactEmail: Array<Point_of_contact_email>;
    pointOfContactLocations: Array<Point_of_contact_locations>;
    pointOfContactCall: Array<Point_of_contact_call>;
  };
}

const PointsOfContact = ({ data }: { data: PageData }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0, // Adjust as needed
  });

  return (
    <>
      {data.frontmatter.enable && (
        <div
          className={`flex flex-col md:col-4 justify-center items-center md:py-0 py-20`}
          ref={ref}
        >
          {/* Email Us */}
          {data.frontmatter.enableEmailIcon && (
            <div
              className={`mb-5 flex flex-col items-center text-center ${inView ? "animate-fade animate-duration-[400ms]" : ""}`}
            >
              <div className="flex items-center justify-center bg-light-grey w-16 h-16 rounded-lg shadow-sm">
                <svg
                  className="w-10 h-10 text-medium-green"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="col-9 pt-2">
                {data.frontmatter.pointOfContactEmail.map(
                  (point_of_contact_email: Point_of_contact_email, index) =>
                    point_of_contact_email.email && (
                      <div key={index}>
                        <h5 className="text-dark-grey">
                          {point_of_contact_email.title}
                        </h5>
                        <p className="text-dark-grey text-md pt-1">
                          {point_of_contact_email.content}
                        </p>
                        <a
                          href={point_of_contact_email.href}
                          className="email-link"
                        >
                          <span className="pt-2 font-semibold text-primary">
                            {point_of_contact_email.email}
                          </span>
                        </a>
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

          {/* Locations  */}
          {data.frontmatter.enableLocationIcon && (
            <div
              className={`mb-5 flex flex-col items-center text-center ${inView ? "animate-fade animate-duration-[400ms]" : ""}`}
            >
              <div className="flex items-center justify-center bg-light-grey w-16 h-16 rounded-lg shadow-sm">
                <svg
                  className="w-10 h-10 text-medium-green"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="col-9 pt-2">
                {data.frontmatter.pointOfContactLocations.map(
                  (
                    point_of_contact_locations: Point_of_contact_locations,
                    index,
                  ) => (
                    <div key={index}>
                      <h5 className="text-dark-grey">
                        {point_of_contact_locations.title}
                      </h5>
                      {point_of_contact_locations.locations &&
                        Object.values(point_of_contact_locations.locations).map(
                          (location, index) => (
                            <div key={index}>
                              <p className="text-dark-grey font-semibold pt-1">
                                {location.state}
                              </p>
                              <p className="text-dark-grey text-md">
                                {location.address}
                              </p>
                            </div>
                          ),
                        )}
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {/* Call Us */}
          {data.frontmatter.enableCallIcon && (
            <div
              className={`flex flex-col items-center text-center ${inView ? "animate-fade animate-duration-[400ms]" : ""}`}
            >
              <div className="flex items-center justify-center bg-light-grey w-16 h-16 rounded-lg shadow-sm">
                <svg
                  className="w-10 h-10 text-medium-green"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="col-9 pt-2">
                {data.frontmatter.pointOfContactCall.map(
                  (point_of_contact_call: Point_of_contact_call, index) => (
                    <div key={index}>
                      <h5 className="text-dark-grey">
                        {point_of_contact_call.title}
                      </h5>

                      <p className="text-dark-grey text-md pt-1">
                        {point_of_contact_call.content}
                      </p>

                      {point_of_contact_call.numbers &&
                        Object.values(point_of_contact_call.numbers).map(
                          (number, index) => (
                            <div
                              key={index}
                              className="flex flex-col pt-2 font-semibold"
                            >
                              <a href={number.href}>
                                <span className="text-dark-grey">
                                  {number.state}
                                </span>{" "}
                                <span className="text-primary">
                                  {number.phone_number}
                                </span>
                              </a>
                            </div>
                          ),
                        )}
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PointsOfContact;
