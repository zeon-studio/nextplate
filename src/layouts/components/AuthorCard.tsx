import Social from "@/components/Social";
import ImageFallback from "@/helpers/ImageFallback";
import { plainify } from "@/lib/utils/textConverter";
import Link from "next/link";

const AuthorCard = ({ data }: { data: any }) => {
  const { title, image, social } = data.frontmatter;
  return (
    <div className="rounded bg-light p-8 text-center dark:bg-darkmode-light">
      {image && (
        <ImageFallback
          className="mx-auto mb-6 rounded"
          src={image}
          alt={title}
          width={120}
          height={120}
        />
      )}
      <h4 className="mb-3">
        <Link href={`/authors/${data.slug}`}>{title}</Link>
      </h4>
      <p className="mb-4">{plainify(data.content?.slice(0, 100))}</p>
      <Social source={social} className="social-icons" />
    </div>
  );
};

export default AuthorCard;
