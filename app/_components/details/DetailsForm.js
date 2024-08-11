"use client";

import Image from "next/image";
import AuthHeader from "../auth/AuthHeader";
import AuthMessage from "../auth/AuthMessage";
import imageUploadIcon from "@/public/assets/images/icon-upload-image.svg";
import imageUploadIconact from "@/public/assets/images/icon-upload-image-active.svg";

import Button from "../ui/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateUser } from "@/app/_lib/services/actions";
import SpinnerMini from "../ui/SpinnerMini";
import { uploadImage } from "@/app/_lib/services/data-service";
import toast from "react-hot-toast";

function DetailsForm({ curUser }) {
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      email: curUser?.email,
      imageUrl: curUser?.imageUrl,
    },
  });

  // console.log(curUser.imageUrl);

  const [isLoading, setIsLoading] = useState(false);

  const { errors } = formState;

  async function onSubmit(data) {
    setIsLoading(true);

    try {
      let imageUrl = data?.imageUrl;

      if (data.imageUrl[0]) {
        imageUrl = await uploadImage(data.imageUrl[0]);
      }

      let dataObj;
      if (data?.imageUrl) dataObj = { ...data, imageUrl };
      if (!data?.imageUrl) dataObj = { ...data, imageUrl: curUser?.imageUrl };

      await updateUser(curUser.user_Id, dataObj);
      reset();
      toast.success("Your changes have been successfully saved!");
    } catch (error) {
      console.error("Error during submission:", error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function log() {
    console.log("logged");
  }

  return (
    <div className="flex flex-col bg-white-200 pt-8 gap-4 px-6 2xl:px-20 rounded-md relative">
      <AuthHeader>ProfilecDetails</AuthHeader>

      <AuthMessage>
        Add Your details to create a personal touch to your profile
      </AuthMessage>

      <FlexDiv>
        <AuthMessage>profile Picture</AuthMessage>
        <ImageAdd register={register} curUser={curUser} />
      </FlexDiv>

      <FlexDiv>
        <AuthMessage>First Name*</AuthMessage>

        <span className="flex flex-col gap-2">
          <p className="text-red-600">{errors?.firstName?.message}</p>
          <input
            type="text"
            placeholder="e.g. Smith"
            className={`h-12 w-full  outline-none placeholder:text-lg placeholder:text-greyy-700 border ${
              errors.firstName ? "border-red-700" : "border-greyy-700"
            } rounded-md pl-8 pr-12`}
            id="firstName"
            defaultValue={curUser?.firstName}
            {...register("firstName", {
              required: "Can't be empty",
            })}
          />
        </span>

        <AuthMessage>Last Name*</AuthMessage>

        <span className="flex flex-col gap-2">
          <p className="text-red-600">{errors?.lastName?.message}</p>

          <input
            type="text"
            placeholder="e.g. Alex"
            className={`h-12 w-full  outline-none placeholder:text-lg placeholder:text-greyy-700 border ${
              errors.lastName ? "border-red-700" : "border-greyy-700"
            } rounded-md pl-8 pr-12`}
            id="lastName"
            defaultValue={curUser.lastName}
            {...register("lastName", {
              required: "Can't be empty",
            })}
          />
        </span>

        <AuthMessage>Email</AuthMessage>

        <span className="flex flex-col gap-2">
          <p className="text-red-600">{errors?.email?.message}</p>
          <input
            type="text"
            disabled={true}
            placeholder="e.g. Smith@example.com"
            className={`h-12 w-full  outline-none placeholder:text-lg placeholder:text-greyy-700 border ${
              errors.email ? "border-red-700" : "border-greyy-700"
            } rounded-md pl-8 pr-12`}
            defaultValue={curUser?.email}
            // {...register("email", {
            //   required: "Can't be empty",
            //   pattern: {
            //     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            //     message: "Invalid email address",
            //   },
            // })}
          />
        </span>
      </FlexDiv>
      <div className="border-t border-t-greyy-200 py-6 flex justify-end ">
        <Button onClick={handleSubmit(onSubmit)}>
          {isLoading ? <SpinnerMini /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

function FlexDiv({ children }) {
  return (
    <div className="grid md:grid-cols-[1fr,2fr] items-center justify-between gap-2 md:gap-6 bg-greyy-200 rounded-md w-full lg:min-h-40 px-6 md:px-4 py-4 ">
      {children}
    </div>
  );
}

function ImageAdd({ register, curUser, errors }) {
  const [img, setImg] = useState(null);

  const { imageUrl } = curUser || {};

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result); // Set the result (data URL) as the selected image
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }

  return (
    <div className="grid md:grid-cols-2 items-center justify-center gap-6 lg:gap-2">
      <button
        className={`relative flex items-center justify-center lg:w-36 rounded-md h-48 w-40 lg:h-36  flex-col cursor-pointer ${
          img ? "bg-greyy-900 bg-opacity-20" : "bg-purples-50"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileUpload}
          id="imageUrl"
          {...register("imageUrl", {
            required: "Please upload an image file (JPG, PNG)",
          })}
        />
        {img || imageUrl ? (
          <>
            <div className="relative lg:w-36 rounded-md h-48 w-40 lg:h-36   overflow-hidden flex flex-col items-center justify-center">
              <Image
                src={imageUrl ? imageUrl : img}
                fill
                alt="Uploaded Image"
                quality={80}
              />
              <input
                type="file"
                accept="image/*"
                className="absolute z-50 inset-0 opacity-0 cursor-pointer"
                onChange={handleFileUpload}
                {...register("imageUrl", {
                  required: "Please upload an image file (JPG, PNG)",
                })}
              />
              <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
              <div className="relative z-10 h-8 w-8">
                <Image src={imageUploadIconact} fill alt="Upload new image" />
              </div>
              <p className="relative z-10 text-white-200 font-bold">
                Change Image
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="relative h-8 w-8">
              <Image src={imageUploadIcon} fill alt="Upload image" />
            </div>
            <p className="text-purples-500">+ Upload Image</p>
          </>
        )}
      </button>

      <p className="text-greyy-700 text-lg lg:text-[12px] xl:text-sm">
        {errors?.imageUrl?.message
          ? errors?.imageUrl.message
          : " Image must be below 1024x1024px. Use PNG or JPG format."}
      </p>
    </div>
  );
}

export default DetailsForm;
