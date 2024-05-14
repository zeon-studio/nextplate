import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import { getTranslations } from "@/lib/languageParser";
import dateFormat from "@/lib/utils/dateFormat";
import { slugSelector } from "@/lib/utils/slugSelector";
import { humanize, plainify, slugify } from "@/lib/utils/textConverter";
import { Post } from "@/types";
import Link from "next/link";
import { FaRegFolder, FaRegUserCircle } from "react-icons/fa";

const BlogCard = async ({ data, lang }: { data: Post; lang: string }) => {
  const { read_more } = await getTranslations(lang);
  const { summary_length, blog_folder } = config.settings;
  const { title, image, author, categories, date } = data.frontmatter;

  return (
    <div className="bg-body dark:bg-darkmode-body">
      {image && (
        <ImageFallback
          className="mb-6 w-full rounded"
          src={image}
          alt={title}
          width={445}
          height={230}
        />
      )}
      <h4 className="mb-3">
        <Link href={slugSelector(lang, `/${blog_folder}/${data.slug}`)}>
          {title}
        </Link>
      </h4>
      <ul className="mb-4">
        <li className="mr-4 inline-block">
          <Link href={slugSelector(lang, `/authors/${slugify(author)}`)}>
            <FaRegUserCircle className={"-mt-1 mr-2 inline-block"} />
            {humanize(author)}
          </Link>
        </li>
        <li className="mr-4 inline-block">
          <FaRegFolder className={"-mt-1 mr-2 inline-block"} />
          {categories?.map((category: string, index: number) => (
            <Link
              key={index}
              href={slugSelector(lang, `/categories/${slugify(category)}`)}
            >
              {humanize(category)}
              {index !== categories.length - 1 && ", "}
            </Link>
          ))}
        </li>
        {date && <li className="inline-block">{dateFormat(date)}</li>}
      </ul>
      <p className="mb-6">
        {plainify(data.content!.slice(0, Number(summary_length)))}
      </p>
      <Link
        className="btn btn-outline-primary btn-sm"
        href={slugSelector(lang, `/${blog_folder}/${data.slug}`)}
      >
        {read_more}
      </Link>
    </div>
  );
};

export default BlogCard;
