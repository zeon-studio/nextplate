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
        title="HomePlate Typography Styles"
        meta_title="Typography"
        description="An explanation of the typeface and styling used in HomePlate's website."
        image={image}
      />
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="md:col-10 lg:col-7">
              <h1 className="my-4">Logo</h1>
              <div className="content">
                <p className="text-xl">
                  The Homeplate logo showcases a unique design featuring a
                  stylized speech bubble with a spoon and fork intersecting at
                  its center, symbolizing sharing homemade meals and connection.
                  The overall design, with its circular shape and speech bubble,
                  resembles a plate, emphasizing the theme of food and
                  hospitality. The spoon and fork represent the sharing of
                  homemade meals, while the speech bubble signifies
                  communication and connection within the community. The
                  circular yellow background embodies warmth, hospitality, and
                  the nourishing quality of home-cooked food. The tagline, "From
                  Ours to Yours," encapsulates the core mission of our app:
                  connecting buyers and sellers through personalized meal plans
                  that feel as comforting as a meal made at home. The font used
                  for "Homeplate" is bold and modern, signifying trust and
                  community, while still maintaining a friendly and inviting
                  appearance, aligning with the spirit of homemade sharing and
                  quality.
                </p>

                <div>
                  <h1>Logo Variations</h1>
                  <div className="content">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex flex-col items-center">
                        <p className="text-center mb-2 font-bold">
                          Original Full Colour
                        </p>
                        <ImageFallback
                          src="/images/logo/homeplate-full-colour-logo.svg"
                          alt="Full Colour Logo"
                          width={300}
                          height={300}
                          className="logo-img"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-center mb-2 font-bold">
                          Black and White
                        </p>
                        <ImageFallback
                          src="images/logo/homeplate-black-white-logo.svg"
                          alt="Black and White Logo"
                          width={300}
                          height={300}
                          className="logo-img"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-center mb-2 font-bold">Grayscale</p>
                        <ImageFallback
                          src="images/logo/homeplate-greyscale-logo.svg"
                          alt="Grayscale Logo"
                          width={300}
                          height={300}
                          className="logo-img"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-center mb-2 font-bold">
                          Monochromatic
                        </p>
                        <ImageFallback
                          src="images/logo/homeplate-monochromatic-logo.svg"
                          alt="Monochromatic Logo"
                          width={300}
                          height={300}
                          className="logo-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <h1>Favicons</h1>
                  <div className="container">
                    <p className="text-xl">
                      Each favicon has a clear space of 1/4 its length. 16px = 4px, 32px = 8px, 48px = 12px.
                    </p>
                    <div className="row justify-center">
                      <div className="md:col-10 lg:col-8 text-center">
                        <div className="flex justify-around items-center">
                          <div className="flex flex-col items-center">
                            <img
                              src="/images/favicon/favicon-16x16.png"
                              alt="16px favicon"
                              className="mb-2"
                              width={16}
                              height={16}
                            />
                            <p className="font-bold text-lg">16px</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <img
                              src="/images/favicon/favicon-32x32.png"
                              alt="32px favicon"
                              className="mb-2"
                              width={32}
                              height={32}
                            />
                            <p className="font-bold text-lg">32px</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <img
                              src="/images/favicon/favicon-48x48.png"
                              alt="48px favicon"
                              className="mb-2"
                              width={48}
                              height={48}
                            />
                            <p className="font-bold text-lg">48px</p>
                          </div>
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