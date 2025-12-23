import { useNavigate, useParams } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { useState } from "react";

const LANGUAGES = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
] as const;

export function Header() {
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const currentLang = (params as { lang?: string }).lang || "es";
  const [showLangMenu, setShowLangMenu] = useState(false);

  function handleLanguageChange(langCode: string) {
    setShowLangMenu(false);

    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split("/").filter(Boolean);

    if (pathSegments.length === 0) {
      navigate({ to: "/$lang/courses", params: { lang: langCode } });
      return;
    }

    pathSegments[0] = langCode;
    const newPath = `/${pathSegments.join("/")}`;

    window.location.pathname = newPath;
  }

  const selectedLang =
    LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="fixed top-0 right-0 z-50 flex gap-3 p-4">
      {/* Language Selector */}
      <div className="relative">
        <button
          className="flex items-center gap-2 rounded-lg border-2 border-black bg-white px-4 py-2 font-bold hover:bg-gray-50"
          onClick={() => setShowLangMenu(!showLangMenu)}
          type="button"
        >
          <Globe className="h-5 w-5" />
          <span>{selectedLang.flag}</span>
        </button>

        {showLangMenu && (
          <div className="absolute right-0 mt-2 w-48 rounded-lg border-2 border-black bg-white shadow-lg">
            {LANGUAGES.map((lang) => (
              <button
                className={`flex w-full items-center gap-3 px-4 py-3 text-left font-bold hover:bg-gray-50 ${
                  lang.code === currentLang ? "bg-gray-100" : ""
                }`}
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                type="button"
              >
                <span className="text-2xl">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
