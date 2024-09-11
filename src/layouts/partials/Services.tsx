// "use client";

// import ImageFallback from "@/helpers/ImageFallback";
// import { markdownify } from "@/lib/utils/textConverter";
// import { Service } from "@/types";
// import Link from "next/link";
// import { useInView } from "react-intersection-observer";

// interface PageData {
//   frontmatter: {
//     enable?: boolean;
//     title: string;
//     description: string;
//     services: Array<Service>;
//   };
// }

// const Services = ({ data }: { data: PageData }) => {
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0, // Adjust as needed
//   });

//   const maxWidth =
//     data.frontmatter.services.length === 4 ? "max-w-[330px]" : "max-w-[450px]";
//   const imageHeight =
//     data.frontmatter.services.length === 4
//       ? "2xl:max-h-[190px] max-h-[220px]"
//       : "max-h-[300px]";

//   const renderServiceCard = (service: Service, index: number) => (
//     <div
//       className={`rounded shadow-lg bg-white border ${maxWidth} overflow-hidden ${
//         inView
//           ? `animate-fade-up animate-duration-[500ms] animate-delay-[${
//               400 + index * 50
//             }ms]`
//           : ""
//       }`}
//       key={index}
//     >
//       {/* Coming soon ribbon */}
//       {inView && index === 3 && (
//         <div className="absolute top-[74px] right-[0px] z-20">
//           <div
//             className="bg-gradient-to-b from-red-700 to-red-500 text-white text-md font-semibold py-1 px-2 justify-center text-center md:h-[35px] h-[30px]"
//             style={{
//               transform: "rotate(35deg)",
//               transformOrigin: "top right",
//               width: "208px",
//               top: "1rem",
//               right: "-1.5rem",
//               position: "absolute",
//             }}
//           >
//             Coming Soon
//           </div>
//         </div>
//       )}

//       <div className="pb-3 px-4 py-4">
//         <div
//           className="relative rounded overflow-hidden"
//           style={{ maxHeight: "300px" }}
//         >
//           <Link href={service.link}>
//             <ImageFallback
//               height={1999}
//               width={1330}
//               src={service.image}
//               alt={service.alt}
//               className={`rounded-lg ease-in duration-150 transform hover:scale-110 ${imageHeight}`}
//               style={{
//                 objectFit: "cover",
//                 transition: "transform 0.5s",
//                 transformOrigin: "center",
//               }}
//             />
//           </Link>
//         </div>
//       </div>

//       <div className="py-5 px-8">
//         <div className="flex flex-col items-left">
//           <div>
//             <h3
//               dangerouslySetInnerHTML={markdownify(service.title)}
//               className="h5 font-primary font-semibold text-dark-grey"
//             />
//           </div>
//         </div>
//         <blockquote
//           className="mt-4"
//           dangerouslySetInnerHTML={markdownify(service.content)}
//         />
//         {service.button.enable && (
//           <Link
//             className="btn btn-transparent border-primary text-primary mt-5 mb-5 hover:bg-primary hover:text-white"
//             href={service.button.link}
//           >
//             <div className="flex flex-row items-center">
//               {service.button.label}
//               <svg
//                 className="ml-1"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="18"
//                 height="18"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m9 5 7 7-7 7"
//                 />
//               </svg>
//             </div>
//           </Link>
//         )}
//       </div>
//     </div>
//   );

//   const lgGridCols =
//     data.frontmatter.services.length === 4
//       ? "lg:grid-cols-4"
//       : "lg:grid-cols-3";

//   return (
//     <>
//       {data.frontmatter.enable && (
//         <section className="section bg-theme-light w-full">
//           <div className="2xl:col-10 col-auto mx-auto px-4">
//             <div className="mx-auto text-center md:col-10">
//               <h2
//                 dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
//                 className="mb-4 text-dark-grey"
//               />
//             </div>

//             <div className="mx-auto mb-12 text-center md:col-10 lg:col-8 xl:col-7">
//               <p
//                 className="text-lg"
//                 dangerouslySetInnerHTML={markdownify(
//                   data.frontmatter.description!,
//                 )}
//               />
//             </div>

//             <div ref={ref} className="flex items-center justify-center">
//               <div
//                 className={`grid grid-cols-1 md:grid-cols-2 ${lgGridCols} xl:gap-8 gap-4 py-4 px-5`}
//               >
//                 {data.frontmatter.services.map(renderServiceCard)}
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default Services;

// "use client";

// import ImageFallback from "@/helpers/ImageFallback";
// import { markdownify } from "@/lib/utils/textConverter";
// import { Service } from "@/types";
// import Link from "next/link";
// import { useInView } from "react-intersection-observer";

// interface PageData {
//   frontmatter: {
//     enable?: boolean;
//     title: string;
//     description: string;
//     services: Array<Service>;
//   };
// }

// const Services = ({ data }: { data: PageData }) => {
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0, // Adjust as needed
//   });

//   const maxWidth =
//     data.frontmatter.services.length === 4 ? "max-w-[330px]" : "max-w-[450px]";
//   const imageHeight =
//     data.frontmatter.services.length === 4
//       ? "2xl:max-h-[190px] max-h-[220px]"
//       : "max-h-[300px]";

//   const renderServiceCard = (service: Service, index: number) => (
//     <div
//       className={`relative overflow-hidden h-[470px] ${
//         inView
//           ? `animate-fade-up animate-duration-[500ms] animate-delay-[${
//               400 + index * 50
//             }ms]`
//           : ""
//       }`}
//       key={index}
//     >
//       <div className="absolute inset-0">
//         <Link href={service.link}>
//           <ImageFallback
//             height={1999}
//             width={1330}
//             src={service.image}
//             alt={service.alt}
//             className={`rounded-lg ease-in duration-150 transform hover:scale-110 w-full h-full`}
//             style={{
//               filter: "brightness(0.8)",
//               objectFit: "cover",
//               transition: "transform 0.5s",
//               transformOrigin: "center",
//             }}
//           />
//         </Link>
//       </div>

//       <div className="relative z-10 flex flex-col justify-between h-full p-4">
//         {/* Coming soon ribbon */}
//         {inView && index === 3 && (
//           <div className="absolute top-[74px] right-[0px] z-20">
//             <div
//               className="bg-gradient-to-b from-red-700 to-red-500 text-white text-md font-semibold py-1 px-2 justify-center text-center md:h-[35px] h-[30px]"
//               style={{
//                 transform: "rotate(35deg)",
//                 transformOrigin: "top right",
//                 width: "208px",
//                 top: "1rem",
//                 right: "-1.5rem",
//                 position: "absolute",
//               }}
//             >
//               Coming Soon
//             </div>
//           </div>
//         )}

//         <div className="relative z-10 flex flex-col justify-between h-full p-4">
//           <div className="relative bg-white bg-opacity-60 backdrop-blur-lg rounded-lg p-4 ">
//             <div>
//               <h3
//                 dangerouslySetInnerHTML={markdownify(service.title)}
//                 className="h5 font-primary font-semibold text-dark-grey"
//               />
//             </div>

//             <blockquote
//               className="mt-4"
//               dangerouslySetInnerHTML={markdownify(service.content)}
//             />

//             {service.button.enable && (
//               <Link
//                 className="btn btn-transparent border-primary text-primary mt-5 mb-5 hover:bg-primary hover:text-white"
//                 href={service.button.link}
//               >
//                 <div className="flex flex-row items-center">
//                   {service.button.label}
//                   <svg
//                     className="ml-1"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="18"
//                     height="18"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="m9 5 7 7-7 7"
//                     />
//                   </svg>
//                 </div>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const lgGridCols =
//     data.frontmatter.services.length === 4
//       ? "lg:grid-cols-4"
//       : "lg:grid-cols-3";

//   return (
//     <>
//       {data.frontmatter.enable && (
//         <section className="section bg-theme-light w-full">
//           <div className="2xl:col-10 col-auto mx-auto px-4">
//             <div className="mx-auto text-center md:col-10">
//               <h2
//                 dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
//                 className="mb-4 text-dark-grey"
//               />
//             </div>

//             <div className="mx-auto mb-12 text-center md:col-10 lg:col-8 xl:col-7">
//               <p
//                 className="text-lg"
//                 dangerouslySetInnerHTML={markdownify(
//                   data.frontmatter.description!,
//                 )}
//               />
//             </div>

//             <div ref={ref} className="flex items-center justify-center">
//               <div
//                 className={`grid grid-cols-1 md:grid-cols-2 ${lgGridCols} xl:gap-8 gap-4 py-4 px-5`}
//               >
//                 {data.frontmatter.services.map(renderServiceCard)}
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default Services;

"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Service } from "@/types";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

interface PageData {
  frontmatter: {
    enable?: boolean;
    title: string;
    description: string;
    services: Array<Service>;
    link: string;
    label: string;
  };
}

const Services = ({ data }: { data: PageData }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0, // Adjust as needed
  });

  const renderServiceCard = (service: Service, index: number) => (
    <div
      className={`relative overflow-hidden rounded-lg w-full group ${
        inView
          ? `animate-fade-up animate-duration-[500ms] animate-delay-[${
              400 + (index + 1) * 50
            }ms]`
          : ""
      }`}
      key={index}
    >
      {/* Background Image */}
      <div className="relative">
        <Link href={service.link}>
          <ImageFallback
            height={2000}
            width={1440}
            src={service.image}
            alt={service.alt}
            className="object-center-bottom rounded-lg ease-in duration-150 transform hover:scale-110 w-full h-full md:min-w-[200px] md:h-[580px] min-h-[470px] max-w-[500px]"
            style={{
              filter: "brightness(0.9)",
              objectFit: "cover",
              transition: "transform 0.5s",
            }}
          />
        </Link>

        {/* Content Container */}
        <div
          className="absolute bottom-0 left-0 w-full bg-gray-600 bg-opacity-50 backdrop-blur-lg p-3 border-t border-transparent group-hover:border-lime-500"
          style={{
            transition: "border 0.3s ease-in-out",
          }}
        >
          {/* Coming Soon Ribbon */}
          {inView && index === 3 && (
            <div className="absolute z-20 xl:top-[-160px] xl:right-[280px] lg:top-[-190px] lg:right-[240px] md:top-[-190px] top-[-140px] right-[240px]">
              <div
                className="w-[300px] xl:w-[350px] bg-gradient-to-b from-red-700 to-red-500 text-white text-lg font-semibold py-1 px-2 text-center md:h-[35px] h-[30px]"
                style={{
                  transform: "rotate(35deg)",
                  transformOrigin: "top right",
                  position: "absolute",
                }}
              >
                Coming Soon
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <div className="bg-white w-[90px] rounded-md text-center mb-2">
              <p
                className="text-sm font-medium uppercase p-1 tracking-wide"
                dangerouslySetInnerHTML={markdownify(service.category)}
              ></p>
            </div>

            <h5
              dangerouslySetInnerHTML={markdownify(service.title)}
              className="text-lg font-bold text-white"
            />
          </div>
          <blockquote
            className="mt-2 text-white"
            dangerouslySetInnerHTML={markdownify(service.content)}
          />
          {service.button.enable && (
            <Link
              className="btn btn-transparent rounded-md border-white text-white my-3 hover:bg-primary hover:border-primary hover:text-white"
              href={service.button.link}
            >
              <div className="flex flex-row items-center">
                {service.button.label}
                <svg
                  className="ml-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m9 5 7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  const xlGridCols =
    data.frontmatter.services.length === 4
      ? "xl:grid-cols-4"
      : "xl:grid-cols-3";

  return (
    <>
      {data.frontmatter.enable && (
        // <section className="section bg-[url('/images/staked-wave.svg')] w-full">
        <section className="section bg-light-green bg-opacity-5 w-full">
          <div className="xl:px-0 px-4 max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
              <div className="flex flex-col text-center md:text-left">
                <h2
                  dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
                  className="text-primary md:text-3xl text-h3 pb-4"
                />
                {data.frontmatter.description && (
                  <p
                    className="text-lg mb-8"
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.description!,
                    )}
                  />
                )}
              </div>

              <Link
                className="ml-3 mb-8 md:mb-0 uppercase font-light text-right rounded-full btn btn-transparent border-primary text-primary hover:bg-dark-grey hover:border-dark-grey hover:text-white"
                href={data.frontmatter.link}
              >
                <div className="flex flex-row text-center md:text-md text-sm">
                  {data.frontmatter.label}
                </div>
              </Link>
            </div>

            <div
              ref={ref}
              className="flex flex-col md:flex-row items-center justify-center"
            >
              <div
                className={`grid grid-cols-1 md:grid-cols-2 ${xlGridCols} gap-4`}
              >
                {data.frontmatter.services.map(renderServiceCard)}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Services;
