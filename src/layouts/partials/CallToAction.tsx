import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Call_to_action } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Call_to_action;
}

const CallToAction = ({ data }: { data: PageData }) => {
  return (
    <>
      {data.frontmatter.enable && (
        <section className="remb-28 mt-28 mb-28">
          <div className="container">
            {/* <div className="relative px-4 py-16 xl:p-20 bg-cover bg-top bg-contact-us bg-brightness-75 h-[450px]"> */}
            <div className="relative h-[450px]">
              <Image
                src="/images/contact-us-image.jpg"
                alt="Image"
                className="rounded-xl w-full h-full object-top object-cover brightness-60"
                width={2400}
                height={1600}
              ></Image>

              <div className="absolute inset-0 px-16 row items-center justify-between">
                {/* <div className="mb-10 md:col-5 lg:col-4 md:order-2 md:mb-0">
                  <ImageFallback
                    className="w-full"
                    src={data.frontmatter.image}
                    width={392}
                    height={390}
                    alt="cta-image"
                  />
                </div> */}
                <div className="md:col-7 md:order-1">
                  <h2
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.title,
                    )}
                    className="mb-2 text-white"
                  />
                  <p
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.description,
                    )}
                    className="mb-6 text-white"
                  />
                  {data.frontmatter.button.enable && (
                    <Link
                      className="btn btn-primary mt-5 hover:bg-dark-grey hover:border-dark-grey"
                      href={data.frontmatter.button.link}
                    >
                      <div className="flex flex-row items-center">
                        {data.frontmatter.button.label}
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
          </div>
        </section>
      )}
    </>
  );
};

export default CallToAction;
