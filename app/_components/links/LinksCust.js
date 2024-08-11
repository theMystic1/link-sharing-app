"use client";

import { useState } from "react";
import LinkCustomization from "./LinkCustomization";
import PhoneLinks from "./PhoneLinks";
import { getLinks, getUser } from "@/app/_lib/services/data-service";

function LinksCust({ links, curUser, id }) {
  const [userLinks, setUserLinks] = useState(links);
  return (
    <>
      <PhoneLinks links={userLinks} curUser={curUser} />
      <LinkCustomization
        id={id}
        userLinks={userLinks}
        setUserLinks={setUserLinks}
      />
    </>
  );
}

export default LinksCust;
