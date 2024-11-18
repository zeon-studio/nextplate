import Link from "next/link";
import React from "react";

const Pagination = ({
  section,
  currentPage,
  totalPages,
}: {
  section: string;
  currentPage: number;
  totalPages: number;
}) => {
  const indexPageLink = currentPage === 2;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  let pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }

  return (
    <>
      {totalPages > 1 && (
        <nav
          className="flex items-center justify-center space-x-3"
          aria-label="Pagination"
        >
          {/* previous */}
          {hasPrevPage ? (
            <Link
              href={
                indexPageLink
                  ? `${section ? "/" + section : "/"}`
                  : `${section ? "/" + section : ""}/page/${currentPage - 1}`
              }
              className="rounded px-2 py-1.5 text-dark hover:bg-theme-light dark:text-darkmode-dark dark:hover:bg-darkmode-theme-light"
            >
              <span className="sr-only">Previous</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                height="30"
                width="30"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          ) : (
            <span className="rounded px-2 py-1.5 text-light">
              <span className="sr-only">Previous</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                height="30"
                width="30"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}

          {/* page index */}
          {pageList.map((pagination, i) => (
            <React.Fragment key={`page-${i}`}>
              {pagination === currentPage ? (
                <span
                  aria-current="page"
                  className="rounded bg-primary px-4 py-2 text-white dark:bg-darkmode-primary dark:text-dark"
                >
                  {pagination}
                </span>
              ) : (
                <Link
                  href={
                    i === 0
                      ? `${section ? "/" + section : "/"}`
                      : `${section ? "/" + section : ""}/page/${pagination}`
                  }
                  passHref
                  aria-current="page"
                  className="rounded px-4 py-2 text-dark hover:bg-theme-light dark:text-darkmode-dark dark:hover:bg-darkmode-theme-light"
                >
                  {pagination}
                </Link>
              )}
            </React.Fragment>
          ))}

          {/* next page */}
          {hasNextPage ? (
            <Link
              href={`${section ? "/" + section : ""}/page/${currentPage + 1}`}
              className="rounded px-2 py-1.5 text-dark hover:bg-theme-light dark:text-darkmode-dark dark:hover:bg-darkmode-theme-light"
            >
              <span className="sr-only">Next</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                height="30"
                width="30"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          ) : (
            <span className="rounded px-2 py-1.5 text-light">
              <span className="sr-only">Next</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                height="30"
                width="30"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}
        </nav>
      )}
    </>
  );
};

export default Pagination;
