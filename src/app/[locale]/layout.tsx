import SearchModal from "@/components/SearchModal";
import config from "@/config/config.json";
import theme from "@/config/theme.json";
import TwSizeIndicator from "@/helpers/TwSizeIndicator";
import { getLocaleMenu } from "@/lib/getLocaleMenu";
import { getDir } from "@/lib/utils/checkRTL";
import { I18nProviderClient } from "@/locales/client";
import { getStaticParams } from "@/locales/server";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";
import "@/styles/main.css";
import { GoogleTagManager } from "@next/third-parties/google";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;

  const { locale } = await params;
  const currentLocaleMenu = await getLocaleMenu(locale);

  // RTL Support
  const dir = await getDir();

  return (
    <html suppressHydrationWarning={true} lang={locale} dir={dir}>
      {/* google tag manager */}
      {config.google_tag_manager.enable && (
        <GoogleTagManager gtmId={config.google_tag_manager.gtm_id} />
      )}

      {/* head */}
      <head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* favicon */}
        <link rel="shortcut icon" href={config.site.favicon} />
        {/* theme meta */}
        <meta name="theme-name" content="nextplate" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />

        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&display=swap`}
          rel="stylesheet"
        />
      </head>

      {/* body */}
      <body suppressHydrationWarning={true} className="antialiased">
        <TwSizeIndicator />
        <Providers>
          <I18nProviderClient locale={locale}>
            <Header currentLocaleMenu={currentLocaleMenu} />
            <SearchModal />
            <main>{children}</main>
            <Footer currentLocaleMenu={currentLocaleMenu} />
          </I18nProviderClient>
        </Providers>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return getStaticParams();
}
