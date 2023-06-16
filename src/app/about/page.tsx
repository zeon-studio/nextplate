import ImageFallback from "@/components/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import { Feature } from "@/types";
import { FaCheck } from "react-icons/fa/index.js";
import PageHeader from "@/partials/PageHeader";

const About = () => {
  const aboutPage = getListPage("pages/about.md");
  const { frontmatter } = aboutPage;
  const {
    features,
  }: {
    features: Feature[];
  } = frontmatter;

  return (
    <>
      <PageHeader title="About" />
    </>
  );
};

export default About;
