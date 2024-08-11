import { cookies } from "next/headers";
import LinkCustomization from "../_components/links/LinkCustomization";
import PhoneLinks from "../_components/links/PhoneLinks";
import { getLink, getLinks, getUser } from "../_lib/services/data-service";
import LinkById from "../_components/links/LinkById";

export async function generateMetadata({ params }) {
  return {
    title: `Link id ${params.linkId} page `,
  };
}

async function page({ params }) {
  const cookiesId = cookies().get("user").value.trim();

  const links = await getLinks(cookiesId);
  const curUser = await getUser(cookiesId.replace(/"/g, ""));

  const id = params?.linkId;

  const link = await getLink(cookiesId, id);

  return <LinkById links={links} curUser={curUser} id={id} link={link} />;
}

export default page;
