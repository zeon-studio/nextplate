import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { Buttons, Feature } from "@/types";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const testimonial = getListPage("sections/testimonial.md");
  const callToAction = getListPage("sections/call-to-action.md");
  const { frontmatter } = homepage;
  const {
    banner,
    features,
  }: {
    banner: {
      title: string;
      image: string;
      content?: string;
      buttons?: Buttons;
    };
    features: Feature[];
  } = frontmatter;

  return (
    <>
      <SeoMeta />
      <section className="section pt-14 relative md:h-[740px] h-[350px]">
        <Image
          src={banner.image}
          alt="Image"
          className="w-full h-full brightness-75 object-cover lg:rounded-tr-[30%]"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="container relative z-10">
            <div className="row justify-center">
              <div className="lg:col-7 md:col-9 mb-8 text-center">
                <h1
                  className="mb-4 text-h3 lg:text-h1"
                  dangerouslySetInnerHTML={markdownify(banner.title)}
                />
                <p
                  className="mb-8 text-xl"
                  dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
                />
                {banner.buttons &&
                  Object.values(banner.buttons).map(
                    (button, index) =>
                      button.enable && (
                        <Link
                          key={index}
                          className="btn btn-primary mr-4"
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
          className={`section-sm ${index % 2 === 0 && "bg-gradient"}`}
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
                      <FaCheck className={"absolute left-0 top-1.5"} />
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li>
                  ))}
                </ul>
                {feature.button.enable && (
                  <Link
                    className="btn btn-primary mt-5"
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

      <Testimonials data={testimonial} />
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
