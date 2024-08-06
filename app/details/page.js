import DetailsForm from "../_components/details/DetailsForm";
import PhoneLinks from "../_components/links/PhoneLinks";

function page() {
  return (
    <div className="grid h-screen mt-8 gap-8 lg:grid-cols-[1.5fr,2fr]">
      <PhoneLinks />
      <DetailsForm />
    </div>
  );
}

export default page;
