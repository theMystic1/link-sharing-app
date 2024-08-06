import Signup from "../_components/auth/Signup";
import Logo from "../_components/ui/Logo";
import { signup } from "../_lib/services/actions";

async function page() {
  // const data = await signup();
  return (
    <form
      className="flex flex-col md:items-center md:justify-center h-screen px-6"
      action={signup}
    >
      <Logo />
      <Signup />
    </form>
  );
}

export default page;
