import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getActiveLanguages, getLanguageObj } from "@/lib/languageParser";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import path from "path";

// Logo Page
const About = ({ params }: { params: { lang: string } }) => {
  const language = getLanguageObj(params.lang);
  const data: RegularPage = getListPage(
    path.join(language.contentDir, "about/_index.md"),
  );
  const { frontmatter, content } = data;
  const { title, meta_title, description, image } = frontmatter;
  return (
    <>
      <SeoMeta
        title="HomePlate Style Guide"
        meta_title="HomePlate"
        description="An explanation of the typeface and styling used in HomePlate's website."
        image={image}
      />
      <section className="section-sm mb-20">
        <div className="container">
          <div className="row justify-center">
            <div className="text-center md:col-10 lg:col-7">
              
              <h2
                dangerouslySetInnerHTML={markdownify("Iconography")}
                className="h2 mb-6"
              />
              <div className="content">
                <p className="text-xl">
                The icons displayed are designed with simplicity and clarity in mind, ensuring they are easily recognizable and user-friendly. Each icon uses a clean and bold silhouette style, with consistent sizing and spacing for visual harmony. The icons rest on a rich brown background, creating a warm and grounded aesthetic. A vibrant yellow is used for the selected or active icon, providing a clear indication of the user's current selection. The remaining icons are white, maintaining a minimalist and modern look. This design balances functionality and aesthetics, ensuring accessibility and ease of navigation.
                </p>
                <div className="flex flex-col items-center">
                   <ImageFallback
                  src="/images/graphics/nav-bar.svg"
                  alt="Full Colour Logo"
                  width={500}
                  height={500}
                  className="logo-img"
                />
                </div>

                <hr className="my-6 border-t border-primaryOrange w-3/4 mx-auto" />

                <div>
                  <h2
                    dangerouslySetInnerHTML={markdownify("Buttons")}
                    className="h2 mb-6"
                  />
                  <div className="content">
                  <p className="text-xl">
                  The buttons and icons are vibrant and user-friendly, with clear actions. Primary buttons like "Show Plates" use bold yellow, while secondary ones like "Load more 100+" are understated in white. Circular icons use distinct colors—red for favorites, yellow for editing, and gray for the cart—ensuring intuitive functionality and visual clarity.
                  </p>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex flex-col items-center">
                        <ImageFallback
                          src="/images/graphics/button1.svg"
                          alt="Full Colour Logo"
                          width={300}
                          height={300}
                          className="logo-img"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <ImageFallback
                          src="/images/graphics/button2.svg"
                          alt="Black and White Logo"
                          width={300}
                          height={300}
                          className="logo-img"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <ImageFallback
                          src="/images/graphics/button3.svg"
                          alt="Grayscale Logo"
                          width={300}
                          height={300}
                          className="logo-img"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <ImageFallback
                          src="/images/graphics/button-group.svg"
                          alt="Monochromatic Logo"
                          width={300}
                          height={300}
                          className="logo-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
               
                <hr className="my-6 border-t border-primaryOrange w-3/4 mx-auto" />

                <div>
                  <h2
                    dangerouslySetInnerHTML={markdownify("Imagery")}
                    className="h2 mb-6"
                  />
                  <div className="content">
                  <p className="text-xl">
                  Our imagery features vibrant, high-quality photos of homemade meals, showcasing their rich textures and colors to evoke warmth and appetizing appeal. Each dish is carefully styled, highlighting its ingredients and freshness. These images accompany product details and recommendations, ensuring a visually engaging and consistent user experience. All photos are crisp and well-lit to maintain a professional aesthetic.
                  </p>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex flex-col items-center">
                        <ImageFallback
                          src="/images/graphics/img1.png"
                          alt="Full Colour Logo"
                          width={300}
                          height={300}
                          className="logo-img"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <ImageFallback
                          src="/images/graphics/img2.png"
                          alt="Black and White Logo"
                          width={300}
                          height={300}
                          className="logo-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default About;
// remove dynamicParams
export const dynamicParams = false;
// generate static params
export async function generateStaticParams() {
  return getActiveLanguages().map((language) => ({
    lang: language.languageCode,
  }));
}