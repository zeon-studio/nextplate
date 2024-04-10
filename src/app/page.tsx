import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import Services from "@/partials/Services";
import { Buttons, Feature } from "@/types";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";

// Templates
// https://dorik.com/blog/service-website-examples
// https://zeon.studio/
const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const testimonial = getListPage("sections/testimonial.md");
  const callToAction = getListPage("sections/call-to-action.md");
  const service = getListPage("sections/service.md");
  const { frontmatter } = homepage;
  const {
    banner,
    features,
  }: {
    banner: {
      title: string;
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
      <section className="section pt-0 relative md:h-[850px] h-[550px] ">
        <Image
          src={banner.image}
          alt="banner image"
          className="w-full h-full brightness-45 object-cover fill" //lg:rounded-tr-[22%]
          style={{
            borderRadius: "0% 0% 50% 30% / 0% 0% 20% 10%",
          }}
          width={2400}
          height={1600}
        />

        <div className="absolute inset-0 flex justify-center items-center sm:bottom-0">
          <div className="container relative z-10">
            <div className="relative xl:pl-10 pl-5 float-left md:bottom-10 bottom-0 animate-fade-15">
              <Image
                src={banner.subimage}
                alt="Image"
                className="mx-auto xl:w-[400px] md:w-[340px] sm:w-[250px] hidden sm:block"
                width={2400}
                height={3000}
              />
            </div>
            <div className="row justify-center animate-fade-5">
              <div className="lg:col-7 md:col-9 mb-8 text-center">
                <h1
                  className="mb-4 text-h3 lg:text-h1 text-white"
                  dangerouslySetInnerHTML={markdownify(banner.title)}
                />
                <p
                  className="mb-8 lg:text-lg text-white"
                  dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
                />
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
                          {button.label}
                        </Link>
                      ),
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {features.map((feature, index: number) => (
        <section
          key={index}
          className="section-sm"
          // className={`section-sm ${index % 2 === 0 && "bg-gradient"}`}
        >
          <div className="container">
            <div className="row items-center justify-between">
              <div
                className={`mb:md-0 mb-6 md:col-5 ${
                  index % 2 !== 0 && "md:order-2"
                }`}
              >
                <ImageFallback
                  src={feature.image}
                  height={480}
                  width={520}
                  alt={feature.title}
                />
              </div>
              <div
                className={`md:col-7 lg:col-6 ${
                  index % 2 !== 0 && "md:order-1"
                }`}
              >
                <h2
                  className="mb-4"
                  dangerouslySetInnerHTML={markdownify(feature.title)}
                />

                <p
                  className="mb-8 text-lg"
                  dangerouslySetInnerHTML={markdownify(feature.content)}
                />
                <ul>
                  {feature.bulletpoints.map((bullet: string) => (
                    <li className="relative mb-4 pl-6" key={bullet}>
                      <FaCheck
                        color="green"
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
                    {feature.button.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      <Services data={service} />
      <Testimonials data={testimonial} />
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
