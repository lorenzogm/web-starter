import { courseListingPage } from "@/data/pages/course-listing-page";
import { exercisePage } from "@/data/pages/exercise";
import { languageListingPage } from "@/data/pages/language-listing-page";
import { levelListingPage } from "@/data/pages/level-listing-page";
import { subjectListingPage } from "@/data/pages/subject-listing-page";

const pages = {
  languageSelection: languageListingPage,
  courseSelection: courseListingPage,
  courseListing: courseListingPage,
  subjectListing: subjectListingPage,
  levelListing: levelListingPage,
  exercise: exercisePage,
} as const;

export function getUIText(
  page: keyof typeof pages,
  key: string,
  lang: string
): string {
  const pageContent = pages[page];
  if (!pageContent) {
    return "";
  }

  const keys = key.split(".");
  let value: any = pageContent;

  for (const k of keys) {
    value = value?.[k];
  }

  if (typeof value === "object" && value !== null && lang in value) {
    return value[lang as keyof typeof value];
  }

  return "";
}

export function replaceVariables(
  text: string,
  variables: Record<string, string>
): string {
  return text.replace(/\{(\w+)\}/g, (match, key) => variables[key] || match);
}
