"use client";

import ImageFallback from "@/components/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Testimonial } from "@/types";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: {
    enable?: boolean;
    title: string;
    description?: string;
    testimonials: Array<Testimonial>;
  };
}

const Testimonials = ({ data }: { data: any }) => {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="mx-auto mb-12 md:col-12 lg:col-12 xl:col-12">
              <h2
                dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
                className="mb-16 text-blue-600"
              />
              <h3 className="mb-2 ">1. An Easy and Trustworthy Button</h3>
              <p>
                {" "}
                A Turnkey Operation with low overheads that gives you a
                jumpstart and speed to globalization. We do the heavy lifting in
                the background and have built a best-in-class approach to the
                necessary infrastructure.
              </p>
            </div>
            <div className="col-12">
              <h3 className="mb-3">2. Distinctive Value Creation</h3>
              <Swiper
                pagination={{ clickable: true }}
                centeredSlides={false}
                // autoplay={{
                //   delay: 2500,
                //   disableOnInteraction: false,
                // }}
                spaceBetween={24}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                }}
              >
                {data.frontmatter.testimonials.map(
                  (item: Testimonial, index: number) => (
                    <SwiperSlide key={index}>
                      <div
                        style={{ height: 300 }}
                        className="rounded-lg bg-blue-50 px-7 py-10 "
                      >
                        <div className="mb-8 flex items-center">
                          <div className="ml-4">
                            <h3
                              dangerouslySetInnerHTML={markdownify(item.name)}
                              className="h5 font-primary font-semibold"
                            />
                          </div>
                        </div>
                        <div
                          dangerouslySetInnerHTML={markdownify(item.content)}
                        ></div>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
              <h3 className="mb-2">3. Increasing Value Creation over Time</h3>
              <p>
                {" "}
                This team-based approach is different from a traditional
                consulting-based approach. The value creation increases for you
                because of increased cultural fit, increased knowledge of your
                operations and increased ownership by the team over time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
