import Image from "next/image";
import logo from "@/public/assets/images/logo-devlinks-large.svg";
function Logo() {
  return (
    <div className="h-16 relative w-40">
      <Image src={logo} fill alt="Logo" />
    </div>
  );
}

export default Logo;
