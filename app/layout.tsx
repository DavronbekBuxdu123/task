import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body className={` antialiased ${montserrat.className}`}>
        <div className="w-full">
          <main className="">{children}</main>
        </div>
      </body>
    </html>
  );
}
