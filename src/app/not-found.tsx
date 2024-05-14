"use client";

import SearchModal from "@/components/SearchModal";
import TwSizeIndicator from "@/helpers/TwSizeIndicator";
import { useTranslate } from "@/hooks/useTranslate";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";
import Link from "next/link";

export default function NotFound() {
  const {
    page_not_found,
    page_not_found_content,
    back_to_home,
    lang,
    main,
    footer,
  } = useTranslate();

  return (
    <>
      <TwSizeIndicator />
      <Providers>
        <Header lang={lang} menu={{ main: main || [] }} />
        <SearchModal lang={lang} />
        <main>
          <section className="section-sm text-center">
            <div className="container">
              <div className="row justify-center">
                <div className="sm:col-10 md:col-8 lg:col-6">
                  <span className="text-[8rem] block font-bold text-dark dark:text-darkmode-dark">
                    404
                  </span>
                  <h1 className="h2 mb-4">{page_not_found}</h1>
                  <div className="content">
                    <p>{page_not_found_content}</p>
                  </div>
                  <Link href="/" className="btn btn-primary mt-8">
                    {back_to_home}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer lang={lang} menu={{ footer: footer || [] }} />
      </Providers>
    </>
  );
}
