import { cookies } from "next/headers";
import LinkCustomization from "./_components/links/LinkCustomization";
import PhoneLinks from "./_components/links/PhoneLinks";
import { getLinks, getUser } from "./_lib/services/data-service";

async function page() {
  const id = cookies().get("user").value.trim();

  const links = await getLinks(id);
  const curUser = await getUser(id.replace(/"/g, ""));

  return (
    <div className="grid h-screen mt-8 gap-8 lg:grid-cols-[1.5fr,2fr] ">
      <>
        <PhoneLinks links={links} curUser={curUser} />
        <LinkCustomization id={id} links={links} />
      </>
    </div>
  );
}

export default page;
