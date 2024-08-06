"use client";

import Image from "next/image";
import AuthHeader from "../auth/AuthHeader";
import AuthMessage from "../auth/AuthMessage";
import imageUploadIcon from "@/public/assets/images/icon-upload-image.svg";
import imageUploadIconact from "@/public/assets/images/icon-upload-image-active.svg";

import Button from "../ui/Button";
import { useState } from "react";

function DetailsForm() {
  return (
    <div className="flex flex-col bg-white-200 pt-8 gap-4 px-6 2xl:px-20 rounded-md relative">
      <AuthHeader>ProfilecDetails</AuthHeader>

      <AuthMessage>
        Add Your details to create a personal touch to your profile
      </AuthMessage>

      <FlexDiv>
        <AuthMessage>profile Picture</AuthMessage>
        <ImageAdd />
      </FlexDiv>

      <FlexDiv>
        <AuthMessage>First Name*</AuthMessage>
        <input
          type="text"
          placeholder="e.g. Alex Smith"
          className="h-12 w-full  outline-none placeholder:text-lg placeholder:text-greyy-700 border border-greyy-700 rounded-md pl-8 pr-12"
        />

        <AuthMessage>Last Name*</AuthMessage>
        <input
          type="text"
          placeholder="e.g. Alex"
          className="h-12 w-full  outline-none placeholder:text-lg placeholder:text-greyy-700 border border-greyy-700 rounded-md pl-8 pr-12"
        />

        <AuthMessage>Email</AuthMessage>
        <input
          type="text"
          placeholder="e.g. Smith@example.com"
          className="h-12 w-full  outline-none placeholder:text-lg placeholder:text-greyy-700 border border-greyy-700 rounded-md pl-8 pr-12"
        />
      </FlexDiv>
      <div className="h-36 "></div>
      <div className="border-t border-t-greyy-200 py-6 flex justify-end ">
        <Button>Save</Button>
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

function ImageAdd() {
  const [img, setImg] = useState(null);

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
      {/* <button className="flex  bg-purples-50 h items-center justify-center lg:w-36 rounded-md h-48  w-40 lg:h-36 flex-col">
        <div className="relative h-8 w-8">
          <Image src={imageUploadIcon} fill alt="Upload image" />
        </div>

        <p className="text-purples-500 ">+ Upload Image</p>
      </button> */}
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
        />
        {img ? (
          <>
            <div className="relative lg:w-36 rounded-md h-48 w-40 lg:h-36   overflow-hidden flex flex-col items-center justify-center">
              <Image
                src={img}
                fill
                objectFit="cover"
                alt="Uploaded Image"
                quality={80}
              />
              <input
                type="file"
                accept="image/*"
                className="absolute z-50 inset-0 opacity-0 cursor-pointer"
                onChange={handleFileUpload}
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
        Image must be below 1024x1024px. Use PNG or JPG format.
      </p>
    </div>
  );
}

export default DetailsForm;
