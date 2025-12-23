import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { languages } from "@/data/languages";

export const Route = createFileRoute("/")({
  component: LanguageSelectionComponent,
});

function LanguageSelectionComponent() {
  const navigate = useNavigate();

  function handleLanguageSelect(languageCode: string) {
    navigate({ to: "/$lang/courses", params: { lang: languageCode } });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8">
      <div className="w-full max-w-3xl space-y-8 text-center">
        <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-3">
          {languages.map((language) => (
            <button
              className="group flex transform flex-col items-center gap-4 rounded-2xl border-4 border-black bg-white p-8 transition-all hover:scale-105 hover:shadow-xl"
              key={language.id}
              onClick={() => handleLanguageSelect(language.id)}
              type="button"
            >
              <span className="text-7xl">{language.flag}</span>
              <span className="font-bold text-2xl text-gray-800">
                {language.nativeName}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
