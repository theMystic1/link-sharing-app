import { cookies } from "next/headers";
import ProfilePreview from "../_components/profilePreview/ProfilePreview";
import { signOutAction } from "../_lib/services/actions";
import { getLinks, getUser } from "../_lib/services/data-service";

async function page() {
  const id = cookies().get("user").value.trim();

  const links = await getLinks(id);
  const curUser = await getUser(id.replace(/"/g, ""));
  return (
    <div>
      <ProfilePreview links={links} curUser={curUser} />
    </div>
  );
}

export default page;
