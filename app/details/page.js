import { cookies } from "next/headers";
import DetailsForm from "../_components/details/DetailsForm";
import PhoneLinks from "../_components/links/PhoneLinks";
import { getLinks, getUser } from "../_lib/services/data-service";

export const metadata = {
  title: "Details page",
};

async function page() {
  const id = cookies().get("user").value.trim();

  const curUser = await getUser(id.replace(/"/g, ""));
  const links = await getLinks(id);

  return (
    <div className="grid h-screen mt-8 gap-8 lg:grid-cols-[1.5fr,2fr]">
      <PhoneLinks links={links} curUser={curUser} />
      <DetailsForm curUser={curUser} />
    </div>
  );
}

export default page;
