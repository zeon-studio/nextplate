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
                dangerouslySetInnerHTML={markdownify("References")}
                className="h2 mb-6"
              />
              <div className="content">
                <p className="text-xl">
                    https://www.figma.com/design/QdgfoTh4nIqGU9Zify5lU5/Bottom-Nav-Bars-(Community)?node-id=0-1&node-type=canvas&t=pqWrZCRLrb6bD4Et-0
                </p>
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