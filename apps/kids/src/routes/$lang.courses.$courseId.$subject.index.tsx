import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Boxes,
  ChevronRight,
  Copy,
  Hash,
  Lock,
  Plus,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCourse, getCourseLevels, getSubject } from "@/utils/data-helpers";
import { getUIText, replaceVariables } from "@/utils/ui-text";

type LevelProgress = {
  completed: number;
  total: number;
  answeredQuestions: Set<number>;
};

type LevelsProgress = {
  [key: string]: LevelProgress;
};

export const Route = createFileRoute("/$lang/courses/$courseId/$subject/")({
  component: LevelsComponent,
});

function LevelsComponent() {
  const navigate = useNavigate();
  const { lang, courseId, subject } = Route.useParams();
  const [levelsProgress, setLevelsProgress] = useState<LevelsProgress>({});
  const [isLoading, setIsLoading] = useState(true);

  const course = getCourse(courseId);
  const subjectData = getSubject(subject);
  const levels = useMemo(
    () => getCourseLevels(courseId, subject),
    [courseId, subject]
  );
  const courseName = course?.name[lang as keyof typeof course.name] || "";
  const subjectName =
    subjectData?.name[lang as keyof typeof subjectData.name] || "";

  useEffect(() => {
    loadProgress();
  }, []);

  function loadProgress() {
    const savedProgress = localStorage.getItem("mathsLevelsProgress");
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      const progress: LevelsProgress = {};

      for (const [levelId, data] of Object.entries(parsed)) {
        const levelData = data as {
          completed?: number;
          total?: number;
          answeredQuestions?: number[];
        };
        progress[levelId] = {
          completed: levelData.completed || 0,
          total: levelData.total || 0,
          answeredQuestions: new Set(levelData.answeredQuestions || []),
        };
      }

      setLevelsProgress(progress);
      setIsLoading(false);
    } else {
      initializeProgress();
    }
  }

  function initializeProgress() {
    const progress: LevelsProgress = {};

    for (const level of levels) {
      progress[level.id] = {
        completed: 0,
        total: 0,
        answeredQuestions: new Set(),
      };
    }

    setLevelsProgress(progress);
    saveProgress(progress);
    setIsLoading(false);
  }

  function saveProgress(progress: LevelsProgress) {
    const serializable: Record<
      string,
      { completed: number; total: number; answeredQuestions: number[] }
    > = {};
    for (const [levelId, data] of Object.entries(progress)) {
      serializable[levelId] = {
        completed: data.completed,
        total: data.total,
        answeredQuestions: Array.from(data.answeredQuestions),
      };
    }
    localStorage.setItem("mathsLevelsProgress", JSON.stringify(serializable));
  }

  function handleLevelSelect(levelId: string, isLocked: boolean) {
    if (isLocked) {
      return;
    }

    const level = levels.find((l) => l.id === levelId);
    if (level) {
      localStorage.setItem("selectedLevel", levelId);
      localStorage.setItem("selectedLevelFile", level.dataFile);
      navigate({
        to: "/$lang/courses/$courseId/$subject/$level",
        params: { lang, courseId, subject, level: levelId },
      });
    }
  }

  function getProgressPercentage(levelId: string): number {
    const PERCENTAGE_MULTIPLIER = 100;
    const progress = levelsProgress[levelId];
    if (!progress || progress.total === 0) {
      return 0;
    }
    return Math.round(
      (progress.completed / progress.total) * PERCENTAGE_MULTIPLIER
    );
  }

  function isLevelCompleted(levelId: string): boolean {
    const progress = levelsProgress[levelId];
    return progress
      ? progress.completed === progress.total && progress.total > 0
      : false;
  }

  function getLevelIcon(levelId: string) {
    const iconMap: Record<string, JSX.Element> = {
      "level-1": <Hash className="h-12 w-12 text-blue-600" />,
      "level-2": <Plus className="h-12 w-12 text-green-600" />,
      "level-3": <X className="h-12 w-12 text-purple-600" />,
      "level-4": <Copy className="h-12 w-12 text-orange-600" />,
      "level-5": <Boxes className="h-12 w-12 text-pink-600" />,
    };

    return iconMap[levelId] || <Hash className="h-12 w-12 text-gray-600" />;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="text-6xl">⏳</div>
          <p className="mt-4 font-semibold text-gray-600 text-xl">
            Cargando niveles...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="mx-auto w-full max-w-4xl space-y-8 pt-8">
        <button
          className="flex items-center gap-2 rounded-lg border-2 border-black bg-white px-4 py-2 font-semibold text-gray-800 transition-all hover:shadow-lg"
          onClick={() =>
            navigate({
              to: "/$lang/courses/$courseId",
              params: { lang, courseId },
            })
          }
          type="button"
        >
          <ArrowLeft className="h-5 w-5" />
          {getUIText("levelListing", "backButton", lang)}
        </button>

        <div className="text-center">
          <h1 className="font-extrabold text-5xl text-gray-800 sm:text-6xl">
            {replaceVariables(getUIText("levelSelection", "title", lang), {
              subject: subjectName,
              course: courseName,
            })}
          </h1>
          <p className="mt-3 font-medium text-gray-600 text-xl sm:text-2xl">
            {getUIText("levelListing", "subtitle", lang)}
          </p>
        </div>

        <div className="space-y-6">
          {levels.map((level) => {
            const percentage = getProgressPercentage(level.id);
            const completed = isLevelCompleted(level.id);
            const progress = levelsProgress[level.id];

            if (!level.enabled) {
              return (
                <Card
                  className="relative mb-6 cursor-not-allowed overflow-hidden border-4 border-gray-300 bg-gray-100 opacity-60 transition-all"
                  key={level.id}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                          {getLevelIcon(level.id)}
                        </div>
                      </div>

                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-bold text-2xl text-gray-800">
                            {level.name[lang as keyof typeof level.name]}
                          </h3>
                          <p className="mt-1 text-gray-600 text-sm">
                            {
                              level.description[
                                lang as keyof typeof level.description
                              ]
                            }
                          </p>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <Lock className="h-8 w-8 text-gray-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }

            return (
              <Link
                key={level.id}
                params={{ lang, courseId, subject, level: level.id }}
                to="/$lang/courses/$courseId/$subject/$level"
              >
                <Card
                  className="relative mb-6 cursor-pointer overflow-hidden border-4 border-black transition-all hover:scale-[1.02] hover:shadow-xl"
                  onClick={() => {
                    localStorage.setItem("selectedLevel", level.id);
                    localStorage.setItem("selectedLevelFile", level.dataFile);
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-50 shadow-md">
                          {getLevelIcon(level.id)}
                        </div>
                      </div>

                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-bold text-2xl text-gray-800">
                            {level.name[lang as keyof typeof level.name]}
                          </h3>
                          <p className="mt-1 text-gray-600 text-sm">
                            {
                              level.description[
                                lang as keyof typeof level.description
                              ]
                            }
                          </p>
                        </div>

                        {level.enabled && progress && (
                          <div className="space-y-2">
                            <Progress className="h-3" value={percentage} />
                            <div className="flex justify-between text-gray-700 text-sm">
                              <span className="font-medium">
                                {progress.completed} / {progress.total}{" "}
                                {getUIText("levelSelection", "exercises", lang)}
                              </span>
                              <span className="font-bold">{percentage}%</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex-shrink-0">
                        {level.enabled ? (
                          <ChevronRight className="h-8 w-8 text-gray-400 transition-transform group-hover:translate-x-1" />
                        ) : (
                          <Lock className="h-8 w-8 text-gray-500" />
                        )}
                      </div>

                      {completed && (
                        <div className="absolute top-4 right-4 rounded-full bg-green-600 px-3 py-1 font-bold text-white text-xs shadow-lg">
                          {getUIText("levelSelection", "completed", lang)}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
