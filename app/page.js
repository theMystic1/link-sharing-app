import { cookies } from "next/headers";

import { getLinks, getUser } from "./_lib/services/data-service";
import LinksCust from "./_components/links/LinksCust";

async function page() {
  const id = cookies().get("user").value.trim();

  const links = await getLinks(id);
  const curUser = await getUser(id.replace(/"/g, ""));

  return (
    <div className="grid h-screen mt-8 gap-8 lg:grid-cols-[1.5fr,2fr] ">
      <LinksCust id={id} links={links} curUser={curUser} />
    </div>
  );
}

export default page;
