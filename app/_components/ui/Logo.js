import Image from "next/image";
import logo from "@/public/assets/images/logo-devlinks-large.svg";

import logosm from "@/public/assets/images/logo-devlinks-small.svg";
function Logo() {
  return (
    <div className="sm:h-16 h-8 relative w-8 sm:w-40">
      <Image src={logo} fill alt="Logo" className="sm:flex hidden" />
      <Image src={logosm} fill alt="Logo" className="flex sm:hidden" />
    </div>
  );
}

export default Logo;
