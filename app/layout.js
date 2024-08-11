import { Instrument_Sans } from "next/font/google";
import "./_styles/globals.css";
import ClientLayout from "./_components/ui/ClientLayout";
import { Toaster } from "react-hot-toast";

const InstrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s -  Developer Links",
    default: "Welcome - Developer Links ",
  },
  description: "Welcome to developer's link sharing hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${InstrumentSans.className} bg-greyy-200`}>
        <ClientLayout>{children}</ClientLayout>

        <Toaster
          position="bottom-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#333333",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
