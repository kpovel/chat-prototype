"use client";

import { useEffect } from "react";
import { setPreffredLang } from "./setPreferredLang";

export function SetPreferredLanguage({ lang }: { lang: string }) {
  useEffect(() => {
    (async () => {
      await setPreffredLang(lang);
    })();
  }, [lang]);

  return <></>;
}
