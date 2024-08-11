import Signup from "../_components/auth/Signup";
import Logo from "../_components/ui/Logo";

export const metadata = {
  title: "Sign up page",
};
async function page() {
  // const data = await signup();
  return (
    <form className="flex flex-col md:items-center md:justify-center h-screen px-6">
      <Logo />
      <Signup />
    </form>
  );
}

export default page;
