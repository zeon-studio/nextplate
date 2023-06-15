import ImageFallback from "@/components/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { Button, Feature, Testimonial } from "@/types";
import { FaCheck } from "react-icons/fa/index.js";
import MyCarousel from "./custom-carousel";

const Home = () => {
  const homepage = getListPage("_index.md");
  const { frontmatter } = homepage;
  const {
    banner,
    features,
    testimonials,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button };
    features: Feature[];
    testimonials: Testimonial[];
  } = frontmatter;

  return (
    <> 
      <section
        className={`section hero-section relative flex`} 
      >
        <MyCarousel />
        {/* <div className="absolute inset-0 bg-gray-500 opacity-70"></div>
        <div className="container relative self-center">
          <div className="align-center row justify-center text-center">
            <div className="mb-16 text-white lg:col-8">
              <h1
                className="text-shadow-18px-18px-black mb-4 text-white"
                dangerouslySetInnerHTML={markdownify(banner?.title)}
              />
              <h4 className="mb-8 text-white">
                Making our customer’s journey to scale, globalize and drive
                sustainable growth
                <strong className="text-4xl">
                  {" "}
                  Easy, Effective and Delightful
                </strong>
              </h4>
              {/* {banner.button!.enable && (
                <a className="btn btn-primary" href={banner?.button!.link}>
                  {banner.button!.label}
                </a>
              )}
            </div>
          </div>
        </div> */}
      </section>

      {features.map((feature, index: number) => (
        <section
          key={index}
          className={`section-sm bg-theme-light ${
            index === 0 && "bg-gradient"
          }`}
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
                  className="mb-4 text-blue-600"
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
                  <a
                    className="btn btn-primary mt-5"
                    href={feature.button.link}
                  >
                    {feature.button.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
      <div className="container">
        <div className="row items-center justify-between">
          <div className={`mb:md-0 mb-6 md:col-12`}>
            <Testimonials
              data={{
                frontmatter: {
                  testimonials: testimonials,
                  title: "Our Value Proposition",
                  description: "some desc",
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
