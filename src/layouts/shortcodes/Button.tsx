import Link from "next/link";

const Button = ({
  label,
  link,
  style,
  rel,
}: {
  label: string;
  link: string;
  style?: string;
  rel?: string;
}) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      className={`btn mb-4 me-4 no-underline hover:text-white dark:hover:text-black ${
        style === "outline" ? "btn-outline-primary" : "btn-primary"
      }`}
    >
      {label}
    </Link>
  );
};

export default Button;
