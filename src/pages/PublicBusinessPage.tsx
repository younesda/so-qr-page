import { useParams } from "react-router-dom";
import QRModePage from "@/pages/QRModePage";
import ShowcaseModePage from "@/pages/ShowcaseModePage";
import { getStaticBusinessBySlug } from "@/data/staticBusiness";

const PublicBusinessPage = () => {
  const { slug } = useParams();
  const business = getStaticBusinessBySlug(slug);

  if (!business) return <p className="p-6 text-rose-300">Page introuvable.</p>;

  if (business.siteMode === "showcase") {
    return <ShowcaseModePage business={business} />;
  }

  return <QRModePage business={business} />;
};

export default PublicBusinessPage;
