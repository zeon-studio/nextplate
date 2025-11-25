import { getSinglePage } from "@/lib/contentParser";
import { slugify } from "@/lib/utils/textConverter";

// get all taxonomies from frontmatter
export const getTaxonomy = async (
  folder: string,
  name: string,
  disableCurrentLocale = false,
): Promise<string[]> => {
  const singlePages = await getSinglePage(folder, disableCurrentLocale);
  const taxonomyPages = singlePages.map((page) => page.frontmatter[name]);
  const taxonomies = [];
  for (let i = 0; i < taxonomyPages?.length; i++) {
    const taxonomyArray = taxonomyPages[i];
    for (let j = 0; j < taxonomyArray?.length; j++) {
      taxonomies.push(slugify(taxonomyArray[j]));
    }
  }
  const taxonomy = [...new Set(taxonomies)];

  return taxonomy;
};

export const getAllTaxonomy = async (folder: string, name: string) => {
  const singlePages = await getSinglePage(folder);
  const taxonomyPages = singlePages.map((page) => page.frontmatter[name]);
  const taxonomies = [];
  for (let i = 0; i < taxonomyPages?.length; i++) {
    const taxonomyArray = taxonomyPages[i];
    for (let j = 0; j < taxonomyArray?.length; j++) {
      taxonomies.push(slugify(taxonomyArray[j]));
    }
  }

  return taxonomies;
};
