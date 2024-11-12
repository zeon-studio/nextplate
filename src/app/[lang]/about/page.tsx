import ColorSquare from "@/app/components/colorSquare";
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
        <div className="container mb-36">
          <div className="row justify-center">
            <div className="text-center md:col-10 lg:col-7">
              <h2
                dangerouslySetInnerHTML={markdownify("Our Colors")}
                className="h2 mb-6"
              />
              <p className="text-center mb-6">
                Our color palette reflects the warmth, energy, and freshness we
                aim to bring to your experience. Each color is chosen to evoke
                feelings of comfort and trust, making the app both inviting and
                engaging. These hues help to convey the home-cooked,
                community-driven atmosphere that sets us apart.
              </p>

              <hr className="my-6 border-t border-primaryOrange w-3/4 mx-auto" />

              <h2
                dangerouslySetInnerHTML={markdownify("Color Palette")}
                className="h2 mb-6"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-x-20 content w-full h-full">
                <ColorSquare
                  color="bg-primaryOrange"
                  hex="#D84012"
                  name="Sinopia"
                  description="This vibrant red-orange shade evokes warmth, energy, and a welcoming feel, ideal for creating an inviting app experience."
                  delay={0}
                />
                <ColorSquare
                  color="bg-jonquil"
                  hex="#FCCE0B"
                  name="Jonquil"
                  description="A bright yellow symbolizing joy and freshness, bringing to mind sunny kitchens and fresh ingredients."
                  delay={0.1}
                />
                <ColorSquare
                  color="bg-silver"
                  hex="#C1CCCE"
                  name="Silver"
                  description="A soft, muted gray-blue that adds calmness and professionalism, allowing other colors to stand out."
                  delay={0.2}
                />
                <ColorSquare
                  color="bg-white"
                  hex="#FFFFFF"
                  name="White"
                  description="Pure white represents cleanliness and simplicity, providing a neutral backdrop that lets food images shine."
                  delay={0.4}
                />
                <ColorSquare
                  color="bg-brown"
                  hex="#442A00"
                  name="Café Noir"
                  description="This deep brown conveys warmth and earthiness, adding a grounded, reliable feel to the app's aesthetic."
                  delay={0.3}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

// generate static params
export async function generateStaticParams() {
  return getActiveLanguages().map((language) => ({
    lang: language.languageCode,
  }));
}
