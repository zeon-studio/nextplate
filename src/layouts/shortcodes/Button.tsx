import Link from "next/link";

const Button = ({
  href,
  style,
  rel,
  children,
}: {
  href: string;
  style?: string;
  rel?: string;
  children: string;
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      className={`btn mb-4 me-4 ${
        style === "outline" ? "btn-outline-primary" : "btn-primary"
      } border-primary no-underline hover:text-white`}
    >
      {children}
    </Link>
  );
};

export default Button;
