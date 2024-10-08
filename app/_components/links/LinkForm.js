"use client";

import codepen from "@/public/assets/images/icon-codepen.svg";
import { useState } from "react";
import { Reorder } from "framer-motion";
import Image from "next/image";
import dragIcon from "@/public/assets/images/icon-drag-and-drop.svg";
import chevron from "@/public/assets/images/icon-chevron-down.svg";
import linkIcon from "@/public/assets/images/icon-link.svg";
import { linkTypes } from "@/app/_lib/services/data-service";
import AuthInput from "../auth/AuthInput";
import { deleteLinkById } from "@/app/_lib/services/actions";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

function LinkForm({
  formNum,
  onHandleFormClose,
  register,
  errors,
  getValues,
  activeLink,
  setActiveLink,
  type = "",
  link,
}) {
  const [openPlatform, setOpenPlatform] = useState(false);
  const [openModalId, setOpenModalId] = useState(null); // Track which modal is open

  const { linkId } = useParams();
  // const navigate = useNav

  function handleOpenPlatform() {
    if (type === "edit") return;
    setOpenPlatform((op) => !op);
  }

  function handleSelectLink(link) {
    setActiveLink(link);
    setOpenPlatform(false);
  }

  function validateRequired(value) {
    return value.trim() !== "" || "URL is required";
  }

  async function handleDelete(e) {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this Link?")) {
      await deleteLinkById(link.id);
    }
  }

  function validateUrlPattern(value) {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name and extension
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );
    return urlPattern.test(value) || "Please enter a valid URL.";
  }

  function validateLinkType(value) {
    if (!activeLink) return false; // Skip this validation if no active link is selected
    const linkName = activeLink.name.trim().split(/\s+/)[0];
    const linkUrl = getValues("urlInput");

    if (linkUrl) {
      const isValid = linkUrl.toLowerCase().includes(linkName.toLowerCase());
      return isValid || `URL isn't for ${activeLink.name}`;
    }
  }

  const isActiveLink = type === "edit" ? link : activeLink;
  const { link: url } = link || {};

  return (
    <Reorder.Item value={link} className="mb-8" as="div">
      <div className="gap-2 md:gap-6 bg-greyy-200 rounded-md w-full lg:min-h-40 px-6 md:px-4 py-4 ">
        <FlexDiv>
          <div className="flex gap-3 items-center relative">
            <button
              className="relative h-6 w-6"
              onClick={(e) => {
                e.preventDefault();
                setOpenModalId(link?.id); // Set the modal to open for this specific link ID
              }}
            >
              <Image src={dragIcon} fill alt="drag and drop image" />
            </button>
            <p className="text-greyy-700 font-bold">Link #{formNum}</p>
            {type === "edit" && !linkId && openModalId === link?.id && (
              <Modal
                onClose={() => setOpenModalId(null)} // Function to close the modal
                id={link.id}
                url={link?.link}
              />
            )}
          </div>

          <button
            className="text-greyy-700"
            onClick={type === "edit" ? handleDelete : onHandleFormClose}
          >
            Remove
          </button>
        </FlexDiv>

        <AuthInput
          label="Platform"
          onClick={handleOpenPlatform}
          className={`py-4 ${
            type === "edit" ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <div>
            {isActiveLink ? (
              <span className="flex gap-5 items-center w-full py-2 bg-transparent h-full">
                <div className="relative h-6 w-6">
                  <Image
                    src={type === "edit" ? link.icon : activeLink?.icon}
                    fill
                    alt="Platform Image"
                  />
                </div>
                <p className={`text-greyy-700 font-bold`}>
                  {type === "edit" ? link.name : activeLink?.name}
                </p>
              </span>
            ) : null}
          </div>

          <div className="absolute h-[80%] -bottom-[32px] w-[95%] flex justify-end">
            <div className="relative h-3 w-4">
              <Image src={chevron} fill alt="Arrow down" />
            </div>
          </div>
        </AuthInput>
        <div className="relative w-full ">
          {openPlatform ? (
            <div className="absolute bg-white-200 left-0 right-0 top-0 rounded-md p-6 z-50 overflow-auto shadow-2xl">
              {linkTypes.map((link) => (
                <Platform
                  link={link}
                  key={link.id}
                  activeLink={activeLink}
                  onHandleLink={handleSelectLink}
                />
              ))}
            </div>
          ) : null}
        </div>

        <AuthInput
          label="Link"
          error={errors?.urlInput?.message}
          className="w-full"
        >
          <div className="relative h-4 w-4 ">
            <Image src={linkIcon} alt="Lock icon" fill />
          </div>
          <input
            type="url"
            placeholder="Enter Your Link"
            className={`${
              errors.urlInput?.message ? "text-red-600" : " text-greyy-700"
            } h-full w-full outline-none placeholder:text-lg placeholder:text-greyy-700 pr-12 bg-transparent`}
            id="urlInput"
            defaultValue={type === "edit" ? url : ""}
            {...register(
              type === "edit" && !linkId ? `${link?.id}` : "urlInput",
              {
                validate: {
                  required: validateRequired,
                  pattern: validateUrlPattern,
                  linkType: validateLinkType,
                },
              }
            )}
          />
        </AuthInput>
      </div>
    </Reorder.Item>
  );
}

export default LinkForm;

function FlexDiv({ children }) {
  return (
    <form className="flex items-center justify-between mb-2">{children}</form>
  );
}

function Platform({ link, activeLink, onHandleLink }) {
  const isActive = activeLink?.id === link.id;

  function handleLink() {
    onHandleLink(link);
  }
  return (
    <button
      className="flex gap-5 items-center w-full py-2 bg-transparent border-b border-b-greyy-200"
      onClick={handleLink}
    >
      <div className="relative h-6 w-6">
        <Image
          src={isActive ? link.iconActive : link.icon}
          fill
          alt="Platform Image"
        />
      </div>
      <p
        className={`${
          isActive ? "text-purples-500" : "text-greyy-700"
        } font-bold`}
      >
        {link.name}
      </p>
    </button>
  );
}

function Modal({ onClose, id, url }) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy(e) {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 6000); // Reset the copied state after 2 seconds
      toast.success("URL copied to clipboard");
      onClose(); // Close the modal when the URL has been copied
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  }
  return (
    <div className="absolute w-28 p-3 rounded-lg shadow-xl top-5 flex flex-col gap-3 bg-white-200 z-[100]">
      <Link
        href={`/${id}`}
        onClick={onClose}
        className="flex gap-3 items-center"
      >
        <div className="relative h-6 w-6">
          <Image src={codepen} alt="pencil icon" fill />
        </div>
        <p className="text-greyy-700">View</p>
      </Link>

      <button className="text-greyy-700" onClick={handleCopy}>
        {isCopied ? "Link copied" : "copy URL"}
      </button>
    </div>
  );
}
