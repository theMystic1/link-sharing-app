import phone from "@/public/assets/images/illustration-phone-mockup.svg";
import Image from "next/image";
import AuthHeader from "../auth/AuthHeader";
import AuthMessage from "../auth/AuthMessage";

function PhoneLinks() {
  const links = [1, 2, 3, 4];

  return (
    <div className="h-full w-full  items-center justify-center bg-white-200 hidden lg:flex rounded-md">
      <div className="relative w-[308px] h-[632px]">
        <Image src={phone} fill alt="Phone" />
        <div className="absolute inset-0 top-2 flex items-center justify-center">
          <div className="w-[280px] min-h-[550px] rounded-2xl bg-white-200 flex flex-col gap-4 items-center p-6 z-50 absolute">
            <div className="h-20 w-20 relative border-2 border-purples-500 rounded-full bg-greyy-200 "></div>
            <AuthHeader>Ben Wright</AuthHeader>
            <AuthMessage>me@gmail.com</AuthMessage>

            {links.map((lnk) => (
              <EmptyLink key={lnk} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneLinks;

function EmptyLink({ children }) {
  return <div className="w-full h-16 rounded-lg bg-greyy-200">{children}</div>;
}
