import Login from "../_components/auth/Login";
import Logo from "../_components/ui/Logo";

export const metadata = {
  title: "Login page",
};

function page() {
  return (
    <form className="flex flex-col items-center justify-center h-screen px-6">
      <Logo />
      <Login />
    </form>
  );
}

export default page;
