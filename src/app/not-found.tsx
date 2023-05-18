import ImageFallback from "@/components/ImageFallback";
import MDXContent from "@/components/MDXContent";
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <SeoMeta title={"Page Not Found"} image={"/images/404.png"} />
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="text-center sm:col-10 md:col-8 lg:col-6">
              <ImageFallback
                className="mb-8 w-full"
                src="/images/404.png"
                alt="page not found"
                height={320}
                width={630}
              />
              <h1 className="h2 mb-4">Something Went Wrong!</h1>
              <div className="content">
                <MDXContent
                  content={
                    "This page doesn't exist or has been removed, <br /> we suggest you go back to Home."
                  }
                />
              </div>
              <Link href="/" className="btn btn-primary mt-8">
                Back To Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
