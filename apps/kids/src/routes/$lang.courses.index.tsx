import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Lock } from "lucide-react";
import { courses } from "@/data/courses";
import { getUIText } from "@/utils/ui-text";

export const Route = createFileRoute("/$lang/courses/")({
  component: CoursesComponent,
});

function CoursesComponent() {
  const navigate = useNavigate();
  const { lang } = Route.useParams();

  function handleCourseSelect(courseId: string, isActive: boolean) {
    if (!isActive) {
      return;
    }
    navigate({ to: "/$lang/courses/$courseId", params: { lang, courseId } });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="mx-auto w-full max-w-4xl space-y-8 pt-8">
        <button
          className="flex items-center gap-2 rounded-lg border-2 border-black bg-white px-4 py-2 font-bold transition-all hover:bg-black hover:text-white"
          onClick={() => navigate({ to: "/" })}
          type="button"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>{getUIText("courseListing", "backButton", lang)}</span>
        </button>

        <h1 className="font-extrabold text-6xl text-gray-800">
          {getUIText("courseSelection", "title", lang)}
        </h1>
        <p className="font-medium text-2xl text-gray-600">
          {getUIText("courseSelection", "subtitle", lang)}
        </p>

        <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-2">
          {courses.map((course) => (
            <button
              className={`group relative flex transform flex-col items-center gap-4 rounded-2xl border-4 p-8 transition-all ${
                course.enabled
                  ? "border-black bg-white hover:scale-105 hover:shadow-xl"
                  : "cursor-not-allowed border-gray-300 bg-gray-100 opacity-60"
              }`}
              disabled={!course.enabled}
              key={course.id}
              onClick={() => handleCourseSelect(course.id, course.enabled)}
              type="button"
            >
              <div className="flex items-center gap-4">
                {!course.enabled && <Lock className="h-8 w-8 text-gray-500" />}
                <span
                  className={`font-bold text-3xl ${
                    course.enabled ? "text-gray-800" : "text-gray-500"
                  }`}
                >
                  {course.name[lang as keyof typeof course.name]}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
