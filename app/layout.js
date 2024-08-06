import { Instrument_Sans } from "next/font/google";
import "./_styles/globals.css";
import ClientLayout from "./_components/ui/ClientLayout";

const InstrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s /  Developer Links",
    default: "Welcome / Dev Links ",
  },
  description: "Welcome to developer's link sharing hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${InstrumentSans.className} bg-greyy-200`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
