import "server-only";

const dictionaries: any  = {
  "/en": () => import("./en.json").then((module) => module.default),
  "/uk": () => import("./uk.json").then((module) => module.default),
  "/login/en": () => import("./login/en.json").then((module) => module.default),
  "/login/uk": () => import("./login/uk.json").then((module) => module.default),
  "/signup/en": () => import("./signup/en.json").then((module) => module.default),
  "/signup/uk": () => import("./signup/uk.json").then((module) => module.default),
};

export async function getDictionary(path: string) {
  return dictionaries[path]();
}
