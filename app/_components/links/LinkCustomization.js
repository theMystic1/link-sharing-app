"use client";

import Image from "next/image";
import AuthHeader from "../auth/AuthHeader";
import AuthMessage from "../auth/AuthMessage";
import Button from "../ui/Button";

import illustration from "@/public/assets/images/illustration-empty.svg";
import { useState } from "react";
import LinkForm from "./LinkForm";

function LinkCustomization() {
  const [isForm, setIsForm] = useState(false);

  function handleForm() {
    setIsForm(true);
  }

  function hideLinkForm() {
    setIsForm(false);
  }
  return (
    <div className="flex flex-col bg-white-200 pt-8 gap-4 px-4 md:px-6 2xl:px-20 rounded-md relative">
      <AuthHeader>Customize your links</AuthHeader>

      <AuthMessage>
        Add/edit/remove links below and then share all your profiles with the
        world!
      </AuthMessage>

      <Button type="secondary" onClick={handleForm}>
        + Add new link
      </Button>
      {isForm ? (
        <LinkForm formNum={1} onHandleFormClose={hideLinkForm} />
      ) : (
        <>
          <div className="bg-greyy-100 w-full rounded-sm flex flex-col gap-6 items-center justify-center mt-8 ">
            <div className="w-[250px] relative h-[161px]">
              <Image src={illustration} fill alt="Empty image" />
            </div>
            <AuthHeader>Lets get you started</AuthHeader>

            <AuthMessage className="text-center">
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We’re here to help
              you share your profiles with everyone!
            </AuthMessage>
          </div>
        </>
      )}
      <div className="h-24 "></div>

      <div className="border-t border-t-greyy-200 py-6 flex justify-end ">
        <Button>Save</Button>
      </div>
    </div>
  );
}

export default LinkCustomization;
