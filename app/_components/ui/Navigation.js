"use client";

import Link from "next/link";
import Button from "./Button";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import Image from "next/image";

import linkLogo from "@/public/assets/images/icon-links-header.svg";
import linkLogoAc from "@/public/assets/images/icon-links-header-active.svg";
import profileLogo from "@/public/assets/images/icon-profile-details-header.svg";
import profileLogoAc from "@/public/assets/images/icon-profile-details-header-active.svg";
import eye from "@/public/assets/images/icon-preview-header.svg";

function Navigation() {
  const pathname = usePathname();

  const paths = [
    {
      name: "links",
      url: "/",
      imageUrl: linkLogo,
      activeImage: linkLogoAc,
    },
    {
      name: "profile details",
      url: "/details",
      imageUrl: profileLogo,
      activeImage: profileLogoAc,
    },
  ];

  return (
    <nav className="flex justify-between items-center h-20 bg-white-200 px-8">
      <Logo />
      <div className="flex gap-8 items-center">
        {paths.map((path, index) => (
          <PathLink
            key={index}
            url={path.url}
            className={`${
              pathname === path.url
                ? "text-purples-500 bg-purples-50 "
                : "text-greyy-700"
            } rounded-md px-4 py-2 flex gap-2 items-center`}
          >
            <div className="relative h-6 w-6">
              <Image
                src={pathname === path.url ? path.activeImage : path.imageUrl}
                fill
                alt="image"
              />
            </div>
            <p className={` capitalize hidden md:flex`}>{path.name}</p>
          </PathLink>
        ))}
      </div>
      <Link href="/profile" className="hidden sm:flex">
        <Button type="secondary">Preview</Button>
      </Link>

      <Link href="/profile" className="flex sm:hidden">
        <Button type="secondary">
          <div className="relative w-6 h-6">
            <Image src={eye} fill alt="eye" />
          </div>
        </Button>
      </Link>
    </nav>
  );
}

function PathLink({ children, url, className }) {
  return (
    <Link href={url} className={className}>
      {children}
    </Link>
  );
}

export default Navigation;
