import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import Services from "@/partials/Services";
import Products from "@/partials/Products";
import PlantBased from "@/partials/PlantBased";
import PhotoGallery from "@/components/PhotoGallery";
import { Buttons, Feature } from "@/types";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import generatePhotos from "@/helpers/photos";

// Templates
// https://dorik.com/blog/service-website-examples
// https://zeon.studio/
// https://www.idahomilkproducts.com/
//https://mooala.com/
const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const testimonial = getListPage("sections/testimonial.md");
  const callToAction = getListPage("sections/call-to-action.md");
  const service = getListPage("sections/service.md");
  const plantBased = getListPage("sections/plant-based.md");
  const product = getListPage("sections/product.md");
  // Define your list of photos for this page
  const galleryPhotos = [
    { src: "/images/gallery/gallery-1.jpg", width: 2400, height: 3200 },
    { src: "/images/gallery/gallery-2.jpg", width: 2400, height: 3000 },
    { src: "/images/gallery/gallery-3.jpg", width: 2400, height: 1133 },
    { src: "/images/gallery/gallery-4.jpg", width: 2400, height: 1601 },
    { src: "/images/gallery/gallery-5.jpg", width: 2400, height: 3200 },
    { src: "/images/cutting-edge-tech.jpg", width: 2400, height: 1600 },
    { src: "/images/commitment-to-quality.jpg", width: 2400, height: 1600 },
    { src: "/images/private-label-co-packing.jpg", width: 3000, height: 2000 },
  ];

  // Generate the photos array using the generatePhotos function
  const photos = generatePhotos(galleryPhotos);

  const { frontmatter } = homepage;
  const {
    banner,
    features,
  }: {
    banner: {
      title: string;
      subtitle?: string;
      image: string;
      subimage: string;
      content?: string;
      buttons?: Buttons;
    };
    features: Feature[];
  } = frontmatter;

  return (
    <>
      <SeoMeta />
      <section className="section pt-0 pb-0 relative lg:h-[800px] sm:h-full h-[350px]">
        <div className="relative w-full h-full">
          <Image
            src={banner.image}
            alt="banner image"
            className="w-full h-full object-cover sm:object-[center_top] opacity-100 object-center"
            width={3908}
            height={2600}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#18181b] via-transparent to-transparent sm:opacity-32 opacity-0"></div>
          <div className="absolute inset-0 bg-[#0f172a] opacity-15 md:opacity-0"></div>
          {/* bg-[#25252573] */}
        </div>

        <div className="absolute inset-0 flex justify-center items-center sm:bottom-0">
          <div className="container relative z-10">
            <div className="relative row lg:bottom-[130px] md:bottom-[100px]">
              <div className="lg:col-8 md:col-9 md:text-left text-center">
                <div className="py-5">
                  <h1
                    className="mb-2 text-h3 lg:text-h1 animate-fade-up animate-duration-[600ms] text-white sm:text-dark-grey"
                    dangerouslySetInnerHTML={markdownify(banner.title)}
                  />

                  <p
                    className="sm:col-10 lg:text-xl text-lg font-medium animate-fade-up animate-delay-[400ms] ease-in text-white sm:text-dark-grey"
                    dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
                  />
                </div>

                {banner.buttons &&
                  Object.values(banner.buttons).map(
                    (button, index) =>
                      button.enable && (
                        <Link
                          key={index}
                          className={button.classname}
                          href={button.link}
                          target={
                            button.link.startsWith("http") ? "_blank" : "_self"
                          }
                          rel="noopener"
                        >
                          <div className="flex flex-row items-center text-xl">
                            {button.label}
                            {index === 1 && (
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
                            )}
                          </div>
                        </Link>
                      ),
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {features.map((feature, index: number) => (
        <section key={index} className="section-sm">
          <div className="container">
            <div className="row items-center justify-center">
              <div
                className={`mb:md-0 lg:pr-10 mb-6 lg:col-6 md:col-8 animate-fade animate-duration-[600ms] ${
                  index % 2 !== 0 && "md:order-2"
                }`}
              >
                <video
                  className="w-full rounded-xs shadow-lg"
                  controls
                  preload="none"
                  autoPlay
                  loop
                  muted
                >
                  <source src={feature.video} type="video/mp4" />
                  Your browser does not support the video.
                </video>
              </div>

              <div
                className={`md:col-8 lg:col-6 items-center${
                  index % 2 !== 0 && "md:order-1"
                }`}
              >
                <div className="flex flex-col items-center col-5 pb-2">
                  <h5
                    className="text-dark-green font-light text-xl tracking-widest pb-1"
                    dangerouslySetInnerHTML={markdownify(feature.title)}
                  />
                  <div className="flex-grow border opacity-40 border-t border-light-green w-[120px]"></div>
                </div>

                <h2
                  className="mb-4 animate-fade-up animate-duration-[600ms] text-dark-grey"
                  dangerouslySetInnerHTML={markdownify(feature.subtitle)}
                />

                <p
                  className="mb-8 text-lg animate-fade-up animate-delay-[400ms] ease-in"
                  dangerouslySetInnerHTML={markdownify(feature.content)}
                />
                <ul className="animate-fade-up animate-delay-[400ms] ease-in">
                  {feature.bulletpoints.map((bullet: string) => (
                    <li className="relative mb-4 pl-6" key={bullet}>
                      <FaCheck
                        color="#65a30d"
                        className={"absolute left-0 top-1.5 "}
                      />
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li>
                  ))}
                </ul>
                {feature.button.enable && (
                  <Link
                    className="btn btn-primary mt-5 hover:bg-dark-grey hover:border-dark-grey"
                    href={feature.button.link}
                  >
                    <div className="flex flex-row items-center">
                      {feature.button.label}
                      <svg
                        className="text-primaryhover:text-white ml-1"
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
        </section>
      ))}

      <Services data={service} />
      <Products data={product} />
      <PlantBased data={plantBased}></PlantBased>
      <PhotoGallery photos={photos} />
      {/* <Testimonials data={testimonial} /> */}
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
