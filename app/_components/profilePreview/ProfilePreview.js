import Link from "next/link";
import Button from "../ui/Button";
import AuthHeader from "../auth/AuthHeader";
import AuthMessage from "../auth/AuthMessage";
import React from "react";
import Image from "next/image";
import LinkCont from "@/app/_components/links/Link";

function ProfilePreview({ links, curUser }) {
  // const links = [1, 2, 3, 4];

  const emptylinks = [1, 2, 3, 4, 5];

  const maxLinks = links;

  // const emptyLinksNeeded = 5 - maxLinks?.length;

  // const linksOrEmptyLinks = [...maxLinks, ...emptylinks];

  return (
    <div className="">
      <PurpleBg>
        <Nav />
        <div className="absolute left-0 top-[220px] right-0 flex justify-center items-center">
          <div className="w-96 min-h-[600px] rounded-lg bg-white-200 flex flex-col gap-4 items-center p-6 shadow-2xl">
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

            {links
              ? links.map((lnk) => <LinkCont key={lnk.id} link={lnk} />)
              : emptylinks.map((em) => <EmptyLink key={em} />)}
          </div>
        </div>
      </PurpleBg>
    </div>
  );
}

export default ProfilePreview;

function PurpleBg({ children }) {
  return (
    <div className="h-96 w-full bg-purples-500 rounded-bl-[30px] rounded-br-[30px] p-6 relative">
      {children}
    </div>
  );
}

function Nav() {
  return (
    <nav className="w-full h-20 bg-white-200 p-4 flex justify-between items-center rounded-lg">
      <Link href="/">
        <Button type="secondary">Back to Editor</Button>
      </Link>
      <Link href="/details">
        <Button>Share Link</Button>
      </Link>
    </nav>
  );
}

function EmptyLink({ children }) {
  return <div className="w-80 h-12 rounded-lg bg-greyy-200">{children}</div>;
}
