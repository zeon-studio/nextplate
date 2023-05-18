import { slugify } from "@/lib/utils/textConverter";

const taxonomyFilter = (posts: any[], name: string, key: any) =>
  posts.filter((post) =>
    post.frontmatter[name].map((name: string) => slugify(name)).includes(key)
  );

export default taxonomyFilter;
