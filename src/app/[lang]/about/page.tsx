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
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="text-center md:col-10 lg:col-7">
              {image && (
                <ImageFallback
                  className="mx-auto mb-6 rounded-lg"
                  src={image}
                  width={200}
                  height={200}
                  alt={title}
                />
              )}
              <h2
                dangerouslySetInnerHTML={markdownify(title)}
                className="h3 mb-6"
              />
              <div className="content">
                <MDXContent content={content} />
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
