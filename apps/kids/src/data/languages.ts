import { z } from "zod";

const languageSchema = z.object({
  id: z.string(),
  name: z.string(),
  nativeName: z.string(),
  flag: z.string(),
  enabled: z.boolean(),
});

const languagesSchema = z.object({
  languages: z.array(languageSchema),
});

export type Language = z.infer<typeof languageSchema>;
export type Languages = z.infer<typeof languagesSchema>;

const languagesData: Language[] = [
  {
    id: "es",
    name: "Español",
    nativeName: "Español",
    flag: "🇪🇸",
    enabled: true,
  },
  {
    id: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    enabled: true,
  },
  {
    id: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    enabled: true,
  },
];

export const languages = z.array(languageSchema).parse(languagesData);
