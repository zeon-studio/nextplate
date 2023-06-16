import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import { markdownify } from "@/lib/utils/textConverter";

const PrivacyPolicy = async () => {
  const data: RegularPage = getListPage("pages/contact.md");
  const { frontmatter } = data;
  const { title, description } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <>
      <PageHeader title="Privacy Policy" />
      <section className="section">
      <div className="container">
      <h6>H Road values individual privacy and we want to give our Site’s visitors the opportunity to know what information we collect about them and how it is treated by us.
This Privacy Policy (this “Policy”), effective as of June 13th, 2023, explains:
Which information about you we collect.</h6><br/><br/>
Purposes of using your personal information and legal basis.
Retention of your personal information.<br/><br/>
<h2>1. Information about you we collect.</h2>
<h4>a) Information collected automatically when you visit our site:</h4>
When navigating our websites and accessing or using our Services, H Road will collect and store Cookies. H Road will also collect and store Cookies. “Cookies” are text files placed in your computer’s browser to store certain preferences and information, which may enhance your browsing experience on H Road’s website. Cookies may be used to personalize your website experience, such as recognizing you by name when you return. H Road does not use Cookies to track or collect personal identification information from website users. If you desire, instructions for your browser will allow you to make certain settings on your computer to warn you before a Cookie is stored, block all Cookies or erase Cookies from your hard drive.
<h4>b) Information is collected when you volunteer to identify yourself, and provide requested information:</h4>
You may choose to write to us, or fill out certain forms or online data requests, which provide your name, e-mail address, and related information.
<h2>2. Purposes of using your personal information and legal basis.</h2>
H Road may use the information collected from you to: (i) to respond to your inquiries; (ii) consider your request or application, (iii) send you appropriate information in regards to news, events, job openings and related information you subscribed to, and (iv) for direct marketing purposes, including to send you newsletters, client alerts and information we think may interest you.
<h2>3. Retention of your personal information.</h2>
<h4>You can exercise your rights of access, rectification, erasure, restriction, opposition, personal information portability, and / or withdrawal of consent regarding your personal information which is stored in our server by email to the following address: info@HRoad.com</h4>
      </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
