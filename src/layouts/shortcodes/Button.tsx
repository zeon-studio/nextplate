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
      className={`btn mb-4 me-4 ${
        style === "outline" ? "btn-outline-primary" : "btn-primary"
      } border-primary no-underline hover:text-white`}
    >
      {label}
    </Link>
  );
};

export default Button;
