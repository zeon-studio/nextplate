import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getActiveLanguages, getLanguageObj } from "@/lib/languageParser";

import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import path from "path";

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
                dangerouslySetInnerHTML={markdownify("Typography")}
                className="h2 mb-6"
              />
              <div className="content">
                <div className="flex justify-evenly max-w-3xl border-jonquil border-2 bg-brown rounded-lg pt-2 pb-6 px-4 shadow-md shadow-black">
                  <div>
                    <h2 className="text-white">Verdana</h2>
                    <p className="text-xl text-white dark:text-white">
                      ABCDEFGHIJKLMNOPQRSTUVWXYZ
                    </p>
                    <p className="text-xl text-white dark:text-white">
                      abcdefghijklmnopqrstuvwxyz
                    </p>
                    <p className="text-xl text-white dark:text-white">
                      1234567890
                    </p>
                  </div>
                  <div>
                    <h3>Styles</h3>
                    <ul className="list-none text-xl text-white">
                      <li className="italic text-xl text-white dark:text-white">
                        italic
                      </li>
                      <li className=" text-xl text-white dark:text-white">
                        Regular
                      </li>
                      <li className="font-semibold text-xl text-white dark:text-white">
                        Medium
                      </li>
                      <li className="font-bold text-xl text-white dark:text-white">
                        Bold
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-xl">
                  Verdana was chosen as our primary font due to its design
                  features being specifically tailored for digital content. Its
                  clear and legible letterforms enhance the user experience for
                  all visitors, including those with visual impairments. Here
                  are the key reasons why Verdana is an ideal font for our site:
                </p>
                <ul className="list-none flex-col justify-start">
                  <li className="text-xl">
                    <span className="font-bold dark:text-white">
                      Legibility:
                    </span>{" "}
                    Verdana was designed specifically for screen use, with wide
                    spacing and clear letterforms. This makes it easier to read
                    on digital devices, especially at smaller sizes.
                  </li>
                  <li className="text-xl">
                    <span className="font-bold dark:text-white">
                      Distinct Characters:
                    </span>{" "}
                    The font features distinct characters that help avoid
                    confusion. For example, lowercase "l" (L), uppercase "I"
                    (i), and "1" (one) are designed to be easily differentiated.
                  </li>
                  <li className="text-xl">
                    <span className="font-bold dark:text-white">
                      Large x-height:
                    </span>{" "}
                    Verdana has a larger x-height, which means the height of
                    lowercase letters is greater relative to uppercase letters.
                    This enhances readability, especially for users with visual
                    impairments.
                  </li>
                  <li className="text-xl">
                    <span className="font-bold dark:text-white">
                      Simple Shapes:
                    </span>{" "}
                    The overall design of the font includes simple shapes and
                    minimal decoration, which reduces visual clutter and helps
                    maintain focus on the text.
                  </li>
                  <li className="text-xl">
                    <span className="font-bold dark:text-white">
                      Wide Letter Spacing:
                    </span>{" "}
                    The generous spacing between letters prevents crowding,
                    making it easier for users to track lines of text without
                    losing their place.
                  </li>
                </ul>

                <hr className="my-6 border-t border-primaryOrange w-3/4 mx-auto" />

                <div>
                  <h2
                    dangerouslySetInnerHTML={markdownify("Font Sizing")}
                    className="h2 mb-6"
                  />
                  <p className="text-xl">
                    HomePlate uses a slightly larger value for the minimum font
                    size than the default rem value set by browsers. This
                    adjustment ensures that text is more readable for users,
                    particularly those with visual impairments or dyslexia. A
                    larger font size reduces eye strain and improves
                    comprehension, creating a more user-friendly experience.
                  </p>
                  <div className="max-w-3xl border-jonquil border-2 bg-brown rounded-lg pt-2 pb-6 px-4 shadow-md shadow-black">
                    <div className="flex-col flex md:flex-row justify-between">
                      <h1 className="text-white text-5xl">&lt;H1&gt; 3rem</h1>
                      <h1 className="text-white text-5xl">Heading</h1>
                    </div>
                    <div className="flex-col flex md:flex-row justify-between">
                      <h2 className="text-white text-4xl">
                        &lt;H2&gt; 2.25rem
                      </h2>
                      <h2 className="text-white text-4xl">SubHeading</h2>
                    </div>
                    <div className="flex-col my-2 md:my-0 flex md:flex-row justify-between">
                      <h3 className="text-white text-3xl">
                        &lt;H3&gt; 1.875rem
                      </h3>
                      <h3 className="text-white text-3xl">Title</h3>
                    </div>
                    <div className="flex-col flex md:flex-row justify-between">
                      <h4 className="text-white text-2xl">&lt;H4&gt; 1.5rem</h4>
                      <h4 className="text-white text-2xl">SubTitle</h4>
                    </div>
                    <div className="flex-col flex md:flex-row justify-between">
                      <p className="text-white dark:text-white text-xl font-bold">
                        &lt;p&gt; 1.25rem
                      </p>
                      <p className="text-white dark:text-white text-xl font-bold">
                        Body
                      </p>
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
