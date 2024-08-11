"use client";

import Image from "next/image";
import AuthHeader from "../auth/AuthHeader";
import AuthMessage from "../auth/AuthMessage";
import Button from "../ui/Button";

import illustration from "@/public/assets/images/illustration-empty.svg";
import { useState } from "react";
import LinkForm from "./LinkForm";
import { useForm } from "react-hook-form";
import { linkTypes } from "@/app/_lib/services/data-service";
import SpinnerMini from "../ui/SpinnerMini";
import { createLink } from "@/app/_lib/services/actions";
import { Reorder } from "framer-motion";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

function LinkCustomization({ id, userLinks, setUserLinks }) {
  const [isForm, setIsForm] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { linkId } = useParams();

  const {
    register,
    formState,
    handleSubmit,
    getValues,
    setError,
    reset,
    setValue,
  } = useForm();

  const { errors } = formState;

  function handleForm() {
    setIsForm(true);
  }

  function hideLinkForm() {
    setIsForm(false);
  }

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      const dataObj = {
        link: data?.urlInput,
        name: activeLink?.name,
        owner_Id: id,
        icon: linkTypes.find((link) => link.id === activeLink.id).linkIcon.src,
      };

      await createLink(dataObj);
      reset();
      toast.success("Link created successfully!!");
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col bg-white-200 pt-8 gap-4 px-4 md:px-6 2xl:px-20 rounded-md relative">
      <AuthHeader>Customize your links</AuthHeader>

      <AuthMessage>
        Add/edit/remove links below and then share all your profiles with the
        world!
      </AuthMessage>

      <Button
        type="secondary"
        onClick={handleForm}
        disabled={linkId ? true : false}
      >
        + Add new link
      </Button>
      {isForm ? (
        <Reorder.Group values={[]}>
          <LinkForm
            formNum={1}
            onHandleFormClose={hideLinkForm}
            register={register}
            errors={errors}
            getValues={getValues}
            setError={setError}
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            type="new"
            setValue={setValue}
          />
        </Reorder.Group>
      ) : userLinks?.length > 0 ? (
        <Reorder.Group values={userLinks} as="main" onReorder={setUserLinks}>
          {userLinks?.map((link, i) => (
            <LinkForm
              key={link.id}
              formNum={i + 1}
              register={register}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
              errors={errors}
              getValues={getValues}
              setError={setError}
              link={link}
              type="edit"
              setValue={setValue}
            />
          ))}
        </Reorder.Group>
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

      <div className="border-t border-t-greyy-200 py-6 flex justify-end ">
        {linkId ? null : (
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={linkId ? true : false}
          >
            {isLoading ? <SpinnerMini /> : "Save"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default LinkCustomization;
