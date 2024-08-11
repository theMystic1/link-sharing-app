"use client";

import { useState } from "react";
import LinkCustomization from "./LinkCustomization";
import PhoneLinks from "./PhoneLinks";

function LinkById({ links, curUser, id, link }) {
  const [userLinks, setUserLinks] = useState(links);

  return (
    <div className="grid h-screen mt-8 gap-8 lg:grid-cols-[1.5fr,2fr] ">
      <PhoneLinks links={userLinks} curUser={curUser} />
      <LinkCustomization id={id} userLinks={link} setUserLinks={setUserLinks} />
    </div>
  );
}

export default LinkById;
