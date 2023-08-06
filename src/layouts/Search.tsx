"use client";

import config from "@/config/config.json";
import { humanize, plainify, slugify } from "@/lib/utils/textConverter";
import Fuse from "fuse.js";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  FaRegFolder,
  FaRegUserCircle,
  FaSearch,
} from "react-icons/fa/index.js";
import ImageFallback from "./helpers/ImageFallback";

const { summary_length, blog_folder } = config.settings;

export type SearchItem = {
  slug: string;
  frontmatter: any;
  content: any;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

const Search = ({ searchList }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = new Fuse(searchList, {
    keys: ["frontmatter.title", "frontmatter.categories", "frontmatter.tags"],
    includeMatches: true,
    minMatchCharLength: 3,
    threshold: 0.5,
  });

  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    setTimeout(function () {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
        searchStr?.length || 0;
    }, 50);
  }, []);

  useEffect(() => {
    let inputResult = inputVal.length > 2 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);

    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    } else {
      history.pushState(null, "", window.location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputVal]);

  return (
    <section className="section-sm">
      <div className="container">
        <div className="row mb-10 justify-center">
          <div className="lg:col-8">
            <div className="flex flex-nowrap">
              <input
                className="form-input rounded-r-none"
                placeholder="Search posts"
                type="search"
                name="search"
                value={inputVal}
                onChange={handleChange}
                autoComplete="off"
                autoFocus
                ref={inputRef}
              />
              <button className="btn btn-primary rounded-l-none" type="submit">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        {/* {inputVal.length > 1 && (
          <div className="mt-8">
            Found {searchResults?.length}
            {searchResults?.length && searchResults?.length === 1
              ? " result"
              : " results"}{" "}
            for '{inputVal}'
          </div>
        )} */}
        <div className="row">
          {searchResults?.length < 1 ? (
            <div className="mx-auto pt-5 text-center">
              <ImageFallback
                className="mx-auto mb-6"
                src="/images/no-search-found.png"
                alt="no-search-found"
                width={211}
                height={184}
              />
              <h1 className="h2 mb-4">
                {inputVal.length < 1 ? "Search Post Here" : "No Search Found!"}
              </h1>
              <p>
                {inputVal.length < 1
                  ? "Search for posts by title, category, or tag."
                  : "We couldn't find what you searched for. Try searching again."}
              </p>
            </div>
          ) : (
            searchResults?.map(({ item }, index) => (
              <div className="mb-12 md:col-6 lg:col-4" key={`search-${index}`}>
                <div className="bg-body dark:bg-darkmode-body">
                  {item.frontmatter.image && (
                    <ImageFallback
                      className="mb-6 w-full rounded"
                      src={item.frontmatter.image}
                      alt={item.frontmatter.title}
                      width={445}
                      height={230}
                    />
                  )}
                  <h4 className="mb-3">
                    <Link href={`/${blog_folder}/${item.slug}`}>
                      {item.frontmatter.title}
                    </Link>
                  </h4>
                  <ul className="mb-4">
                    <li className="mr-4 inline-block">
                      <a href={`/authors/${slugify(item.frontmatter.author)}`}>
                        <FaRegUserCircle
                          className={"-mt-1 mr-2 inline-block"}
                        />
                        {humanize(item.frontmatter.author)}
                      </a>
                    </li>
                    <li className="mr-4 inline-block">
                      <FaRegFolder className={"-mt-1 mr-2 inline-block"} />
                      {item.frontmatter.categories.map(
                        (category: string, index: number) => (
                          <a
                            href={`/categories/${slugify(category)}`}
                            key={category}
                          >
                            {humanize(category)}
                            {index !== item.frontmatter.categories.length - 1 &&
                              ", "}
                          </a>
                        ),
                      )}
                    </li>
                  </ul>
                  <p className="mb-6">
                    {plainify(item.content?.slice(0, Number(summary_length)))}
                  </p>
                  <a
                    className="btn btn-outline-primary btn-sm"
                    href={`/${blog_folder}/${item.slug}`}
                  >
                    read more
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Search;
