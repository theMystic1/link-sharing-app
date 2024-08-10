import arrRight from "@/public/assets/images/icon-arrow-right.svg";
import Image from "next/image";
// import { Link } from "next/navigation";

function LinkCont({ link }) {
  return (
    <button
      className={`w-full h-12 items-center justify-between  p-3 rounded-lg flex ${
        link?.name.toLowerCase() === "youtube"
          ? "bg-red-500"
          : link?.name.toLowerCase() === "github"
          ? "bg-gray-900"
          : link?.name.toLowerCase() === "linkedin"
          ? "bg-blue-500"
          : link?.name.toLowerCase() === "facebook"
          ? "bg-blue-800"
          : link?.name.toLowerCase() === "frontend mentor"
          ? "bg-purple-950"
          : link?.name.toLowerCase() === "devto"
          ? "bg-greyy-900"
          : link?.name.toLowerCase() === "codewars"
          ? "bg-pink-950"
          : link?.name.toLowerCase() === "codepen"
          ? "bg-green-600"
          : link?.name.toLowerCase() === "gitlab"
          ? "bg-greyy-900"
          : link?.name.toLowerCase() === "hashnode"
          ? "bg-zinc-800"
          : link?.name.toLowerCase() === "twitter"
          ? "bg-black"
          : link?.name.toLowerCase() === "stack overflow"
          ? "bg-orange-700"
          : "bg-amber-800"
      }`}
    >
      <span className="flex gap-3 items-center">
        <div className="relative h-6 w-6">
          <Image src={link?.icon} fill alt={link?.name} />
        </div>
        <p className="text-greyy-200 font-bold">{link?.name}</p>
      </span>
      <div className="relative h-6 w-6">
        <Image src={arrRight} fill alt={"arrow right"} />
      </div>
    </button>
  );
}

export default LinkCont;
