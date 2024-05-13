import SearchModal from "@/components/SearchModal";
import TwSizeIndicator from "@/helpers/TwSizeIndicator";
import { getDictionary } from "@/lib/utils/languageParser";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";
import "@/styles/main.scss";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const menu = await getDictionary(params.lang);

  return (
    <>
      <TwSizeIndicator />
      <Providers>
        <Header lang={params.lang} menu={menu} />
        <SearchModal />
        <main>{children}</main>
        <Footer lang={params.lang} menu={menu} />
      </Providers>
    </>
  );
}
