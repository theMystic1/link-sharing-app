import phone from "@/public/assets/images/illustration-phone-mockup.svg";
import Image from "next/image";
import AuthHeader from "../auth/AuthHeader";
import AuthMessage from "../auth/AuthMessage";
import LinkCont from "./Link";
import React from "react";

function PhoneLinks({ links, curUser }) {
  const emptylinks = [1, 2, 3, 4, 5];

  const maxLinks = links?.slice(0, 5) || [];

  const emptyLinksNeeded = 5 - maxLinks?.length;

  const linksOrEmptyLinks = [
    ...maxLinks,
    ...emptylinks.slice(0, emptyLinksNeeded),
  ];

  return (
    <div className=" w-full h-screen  items-center justify-center bg-white-200 hidden lg:flex rounded-md">
      <div className="relative w-[308px] h-[632px]">
        <Image src={phone} fill alt="Phone" />
        <div className="absolute inset-0 top-2 flex items-center justify-center">
          <div className="w-[280px] min-h-[550px] rounded-2xl bg-white-200 flex flex-col gap-4 items-center p-6 z-50 absolute">
            <div
              className={`h-20 w-20 relative ${
                curUser?.imageUrl ? "border-2 border-purples-500" : ""
              } rounded-full bg-greyy-200`}
            >
              {curUser?.imageUrl ? (
                <Image
                  src={curUser?.imageUrl}
                  alt="User Image"
                  fill
                  className="rounded-full"
                />
              ) : null}
            </div>
            <h1 className=" text-greyy-900 font-bold text-xl">
              {curUser?.firstName ? (
                `${curUser?.firstName}  ${curUser?.lastName}`
              ) : (
                <div className="w-full h-6 rounded-lg bg-greyy-200"></div>
              )}
            </h1>
            <AuthMessage>{curUser?.email}</AuthMessage>

            {linksOrEmptyLinks.map((lnk, i) => (
              <React.Fragment key={i}>
                {lnk.name ? <LinkCont link={lnk} /> : <EmptyLink key={lnk} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneLinks;

function EmptyLink({ children }) {
  return <div className="w-full h-12 rounded-lg bg-greyy-200">{children}</div>;
}
