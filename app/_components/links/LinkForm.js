import dragIcon from "@/public/assets/images/icon-drag-and-drop.svg";
import Image from "next/image";
import AuthInput from "../auth/AuthInput";
import chevron from "@/public/assets/images/icon-chevron-down.svg";

import linkIcon from "@/public/assets/images/icon-link.svg";

function LinkForm({ formNum, onHandleFormClose }) {
  return (
    <div className="gap-2 md:gap-6 bg-greyy-200 rounded-md w-full lg:min-h-40 px-6 md:px-4 py-4 ">
      <FlexDiv>
        <div className="flex gap-3 items-center">
          <div className="relative h-6 w-6">
            <Image src={dragIcon} fill alt="drag and drop image" />
          </div>
          <p className="text-greyy-700 font-bold">Link #{formNum}</p>
        </div>

        <button className="text-greyy-700" onClick={onHandleFormClose}>
          Remove
        </button>
      </FlexDiv>

      <AuthInput label="Platform">
        <div className="absolute h-[80%] -bottom-[32px] w-[95%] flex justify-end">
          <div className="relative h-3 w-4">
            <Image src={chevron} fill alt="arrow down" />
          </div>
        </div>
      </AuthInput>

      <AuthInput label="Link">
        <div className="relative h-4 w-4 ">
          <Image src={linkIcon} alt="Lock icon" fill />
        </div>
        <input
          type="text"
          placeholder="At least 8 characters"
          className="h-full w-full outline-none placeholder:text-lg placeholder:text-greyy-700 pr-12 bg-transparent"
          id="link"
        />
      </AuthInput>
    </div>
  );
}

export default LinkForm;

function FlexDiv({ children }) {
  return (
    <form className="flex items-center justify-between mb-2">{children}</form>
  );
}
