import { Post } from "@/types";

// sort by date
export const sortByDate = (array: Post[]) => {
  const sortedArray = array.sort(
    (a: any, b: any) =>
      new Date(b.frontmatter.date && b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date && a.frontmatter.date).valueOf(),
  );
  return sortedArray;
};

// sort product by weight
export const sortByWeight = (array: any[]) => {
  const withWeight = array.filter(
    (item: { frontmatter: { weight: any } }) => item.frontmatter.weight,
  );
  const withoutWeight = array.filter(
    (item: { frontmatter: { weight: any } }) => !item.frontmatter.weight,
  );
  const sortedWeightedArray = withWeight.sort(
    (
      a: { frontmatter: { weight: number } },
      b: { frontmatter: { weight: number } },
    ) => a.frontmatter.weight - b.frontmatter.weight,
  );
  const sortedArray = [...new Set([...sortedWeightedArray, ...withoutWeight])];
  return sortedArray;
};
