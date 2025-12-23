import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Lock } from "lucide-react";
import { subjects } from "@/data/subjects";
import { getCourse } from "@/utils/data-helpers";
import { getUIText, replaceVariables } from "@/utils/ui-text";

export const Route = createFileRoute("/$lang/courses/$courseId/")({
  component: SubjectsComponent,
});

function SubjectsComponent() {
  const navigate = useNavigate();
  const { lang, courseId } = Route.useParams();
  const course = getCourse(courseId);
  const courseName = course?.name[lang as keyof typeof course.name] || "";

  function handleSubjectSelect(subjectId: string, isActive: boolean) {
    if (!isActive) {
      return;
    }
    navigate({
      to: "/$lang/courses/$courseId/$subject",
      params: { lang, courseId, subject: subjectId },
    });
  }

  const title = replaceVariables(getUIText("subjectListing", "title", lang), {
    course: courseName,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-8">
      <div className="mx-auto w-full max-w-5xl space-y-8 pt-8">
        <div>
          <button
            className="flex items-center gap-2 rounded-lg border-2 border-black bg-white px-4 py-2 font-bold transition-all hover:bg-black hover:text-white"
            onClick={() => navigate({ to: "/$lang/courses", params: { lang } })}
            type="button"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{getUIText("subjectListing", "backButton", lang)}</span>
          </button>
        </div>

        <h1 className="font-extrabold text-6xl text-gray-800">{title}</h1>
        <p className="font-medium text-2xl text-gray-600">
          {getUIText("subjectListing", "subtitle", lang)}
        </p>

        <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <button
              className={`group relative flex transform flex-col items-center gap-4 rounded-2xl border-4 p-8 transition-all ${
                subject.enabled
                  ? "border-black bg-white hover:scale-105 hover:shadow-xl"
                  : "cursor-not-allowed border-gray-300 bg-gray-100 opacity-60"
              }`}
              disabled={!subject.enabled}
              key={subject.id}
              onClick={() => handleSubjectSelect(subject.id, subject.enabled)}
              type="button"
            >
              <div className="flex flex-col items-center gap-3">
                <span className="text-6xl">{subject.icon}</span>
                <span
                  className={`font-bold text-2xl ${
                    subject.enabled ? "text-gray-800" : "text-gray-500"
                  }`}
                >
                  {subject.name[lang as keyof typeof subject.name]}
                </span>
              </div>
              {!subject.enabled && (
                <div className="absolute top-3 right-3">
                  <Lock className="h-6 w-6 text-gray-500" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
