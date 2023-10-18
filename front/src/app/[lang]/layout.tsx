import { ReactNode } from "react";
import { SetPreferredLanguage } from "./SetPreferredLanguage";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "uk" }];
}

export default function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  return (
    <>
      <SetPreferredLanguage lang={params.lang} />
      {children}
    </>
  );
}
