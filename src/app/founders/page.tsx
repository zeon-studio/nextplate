import AuthorCard from "@/components/AuthorCard";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Author } from "@/types";

const Authors = () => {
  const authorIndex: Author = getListPage("authors/_index.md");
  const authors: Author[] = getSinglePage("authors");
  const { title, meta_title, description, image } = authorIndex.frontmatter;
  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      <section className="section-sm pb-0">
        <div className="container">
          <div className="row justify-center">
            {authors.map((author: Author, index: number) => (
              <div className="mb-14 md:col-6 lg:col-4" key={index}>
                <AuthorCard data={author} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Authors;
