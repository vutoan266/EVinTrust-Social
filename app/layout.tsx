import Header from "./components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "./Provider";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import React, { Suspense } from "react";
import Loading from "./components/Loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EVinTrust Share",
  description: "EVinTrust Share",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        id="app"
        suppressHydrationWarning={true}
      >
        <Provider>
          <Header />
          <StyledComponentsRegistry>
            <div className="pt-12">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
          </StyledComponentsRegistry>
        </Provider>
      </body>
    </html>
  );
}
