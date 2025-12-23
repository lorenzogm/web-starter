import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  type LevelData,
  levelData as level1Data,
  type Operation,
} from "@/data/course-2/maths/level-1-numbers-to-20";
import { getUIText, replaceVariables } from "@/utils/ui-text";

const PERCENTAGE_MULTIPLIER = 100;
const FEEDBACK_TIMEOUT_MS = 1500;
const NUMBER_ONE = 1;
const NUMBER_TWO = 2;
const NUMBER_THREE = 3;
const NUMBER_FOUR = 4;
const NUMBER_FIVE = 5;
const NUMBER_SIX = 6;
const NUMBER_SEVEN = 7;
const NUMBER_EIGHT = 8;
const NUMBER_NINE = 9;
const NUMBER_PAD_DIGITS = [
  NUMBER_ONE,
  NUMBER_TWO,
  NUMBER_THREE,
  NUMBER_FOUR,
  NUMBER_FIVE,
  NUMBER_SIX,
  NUMBER_SEVEN,
  NUMBER_EIGHT,
  NUMBER_NINE,
];

export const Route = createFileRoute(
  "/$lang/courses/$courseId/$subject/$level"
)({
  component: ExercisesComponent,
});

function ExercisesComponent() {
  const navigate = useNavigate();
  const { lang, courseId, subject, level } = Route.useParams();
  const levelData = level1Data as LevelData;
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    () => {
      const storageKey = `progress_${courseId}_${subject}_${level}`;
      const savedProgress = localStorage.getItem(storageKey);
      if (savedProgress) {
        try {
          const progress = JSON.parse(savedProgress);
          if (progress?.answeredQuestions) {
            return new Set(progress.answeredQuestions);
          }
        } catch (error) {
          console.error("Error loading progress:", error);
        }
      }
      return new Set();
    }
  );

  const [currentOperationIndex, setCurrentOperationIndex] = useState(() => {
    const storageKey = `progress_${courseId}_${subject}_${level}`;
    const savedProgress = localStorage.getItem(storageKey);
    let answered = new Set<number>();
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        if (progress?.answeredQuestions) {
          answered = new Set(progress.answeredQuestions);
        }
      } catch (error) {
        console.error("Error loading progress:", error);
      }
    }
    const unanswered = levelData.operations.filter(
      (op) => !answered.has(op.id)
    );
    if (unanswered.length > 0) {
      const randomOp =
        unanswered[Math.floor(Math.random() * unanswered.length)];
      return levelData.operations.indexOf(randomOp);
    }
    return 0;
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  function handleNumberClick(num: number) {
    if (showFeedback) {
      return;
    }
    setUserAnswer((prev) => prev + num);
  }

  function handleDelete() {
    if (showFeedback) {
      return;
    }
    setUserAnswer((prev) => prev.slice(0, -1));
  }

  function handleClear() {
    if (showFeedback) {
      return;
    }
    setUserAnswer("");
  }

  function handleSubmit() {
    if (userAnswer === "" || showFeedback) {
      return;
    }

    const currentOp = levelData.operations[currentOperationIndex];
    const correct = Number.parseInt(userAnswer, 10) === currentOp.answer;

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const newAnswered = new Set(answeredQuestions);
      newAnswered.add(currentOp.id);
      setAnsweredQuestions(newAnswered);
      updateProgress(newAnswered);

      setTimeout(() => {
        setShowFeedback(false);
        setUserAnswer("");
        moveToNextQuestion(newAnswered);
      }, FEEDBACK_TIMEOUT_MS);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        setUserAnswer("");
      }, FEEDBACK_TIMEOUT_MS);
    }
  }

  function updateProgress(answered: Set<number>) {
    try {
      const storageKey = `progress_${courseId}_${subject}_${level}`;
      const progressData = {
        courseId,
        subject,
        level,
        completed: answered.size,
        total: levelData.metadata.totalOperations,
        answeredQuestions: Array.from(answered),
        lastUpdated: new Date().toISOString(),
      };

      localStorage.setItem(storageKey, JSON.stringify(progressData));

      // También actualizar el progreso global para la lista de niveles
      const globalKey = "mathsLevelsProgress";
      const savedGlobalProgress = localStorage.getItem(globalKey);
      const allProgress = savedGlobalProgress
        ? JSON.parse(savedGlobalProgress)
        : {};

      allProgress[level] = {
        completed: answered.size,
        total: levelData.metadata.totalOperations,
        answeredQuestions: Array.from(answered),
      };

      localStorage.setItem(globalKey, JSON.stringify(allProgress));
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  }

  function moveToNextQuestion(answered: Set<number>) {
    const unanswered = levelData.operations.filter(
      (op) => !answered.has(op.id)
    );

    if (unanswered.length > 0) {
      const randomOp =
        unanswered[Math.floor(Math.random() * unanswered.length)];
      const newIndex = levelData.operations.indexOf(randomOp);
      setCurrentOperationIndex(newIndex);
    } else {
      navigate({
        to: "/$lang/courses/$courseId/$subject",
        params: { lang, courseId, subject },
      });
    }
  }

  function formatOperation(operation: Operation): string {
    switch (operation.type) {
      case "addition":
        return `${operation.num1} + ${operation.num2}`;
      case "subtraction":
        return `${operation.num1} - ${operation.num2}`;
      case "multiplication":
        return `${operation.num1} × ${operation.num2}`;
      case "complete-to-ten":
        return replaceVariables(
          getUIText("exercise", "operations.completeToTen", lang),
          {
            num: operation.num1.toString(),
            answer: operation.answer.toString(),
          }
        );
      case "doubling":
        return replaceVariables(
          getUIText("exercise", "operations.doubling", lang),
          { num: operation.num1.toString() }
        );
      case "halving":
        return replaceVariables(
          getUIText("exercise", "operations.halving", lang),
          { num: operation.num1.toString() }
        );
      case "decomposition":
        return replaceVariables(
          getUIText("exercise", "operations.decomposition", lang),
          { num: operation.num1.toString() }
        );
      default:
        return `${operation.num1} = ?`;
    }
  }

  const currentOperation = levelData.operations[currentOperationIndex];
  const progress = answeredQuestions.size;
  const total = levelData.metadata.totalOperations;
  const percentage = Math.round((progress / total) * PERCENTAGE_MULTIPLIER);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="flex h-full w-full max-w-2xl flex-col justify-between py-4">
        <div className="flex items-center justify-between">
          <button
            className="flex items-center gap-2 rounded-lg border-2 border-black bg-white px-4 py-2 font-semibold text-gray-800 transition-all hover:shadow-lg"
            onClick={() =>
              navigate({
                to: "/$lang/courses/$courseId/$subject",
                params: { lang, courseId, subject },
              })
            }
            type="button"
          >
            <ArrowLeft className="h-5 w-5" />
            {getUIText("exercise", "backButton", lang)}
          </button>

          <div className="text-right">
            <p className="font-bold text-gray-700 text-lg">
              {progress} / {total}
            </p>
            <p className="text-gray-600 text-sm">
              {percentage}% {getUIText("exercise", "completed", lang)}
            </p>
          </div>
        </div>
        <div className="text-center">
          <h1 className="font-extrabold text-3xl text-gray-800 md:text-4xl">
            {
              levelData.metadata.title[
                lang as keyof typeof levelData.metadata.title
              ]
            }
          </h1>
        </div>
        <div className="rounded-2xl border-4 border-black bg-white p-8 shadow-xl md:p-12">
          <div className="text-center">
            <p className="font-bold text-5xl text-gray-800 md:text-6xl">
              {formatOperation(currentOperation)}
            </p>

            <div className="mt-6 flex justify-center md:mt-8">
              <div className="w-64 rounded-xl border-4 border-black bg-yellow-100 px-8 py-4 md:py-6">
                <p className="font-bold font-mono text-4xl text-gray-800 md:text-5xl">
                  {userAnswer || "_"}
                </p>
              </div>
            </div>

            {showFeedback && (
              <div
                className={`mt-4 flex items-center justify-center gap-3 rounded-lg px-6 py-3 md:mt-6 md:py-4 ${
                  isCorrect
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle className="h-6 w-6 md:h-8 md:w-8" />
                    <span className="font-bold text-xl md:text-2xl">
                      {getUIText("exercise", "feedback.correct", lang)}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 md:h-8 md:w-8" />
                    <span className="font-bold text-xl md:text-2xl">
                      {getUIText("exercise", "feedback.incorrect", lang)}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {NUMBER_PAD_DIGITS.map((num) => (
            <Button
              className="h-16 rounded-xl border-2 border-black bg-white font-bold text-2xl text-gray-800 shadow-lg transition-all hover:scale-105 hover:bg-gray-100 md:h-20 md:text-3xl"
              isDisabled={showFeedback}
              key={num}
              onClick={() => handleNumberClick(num)}
            >
              {num}
            </Button>
          ))}
          <Button
            className="h-16 rounded-xl border-2 border-black bg-red-500 font-bold text-lg text-white shadow-lg transition-all hover:scale-105 hover:bg-red-600 md:h-20 md:text-xl"
            isDisabled={showFeedback}
            onClick={handleClear}
          >
            {getUIText("exercise", "buttons.clear", lang)}
          </Button>
          <Button
            className="h-16 rounded-xl border-2 border-black bg-white font-bold text-2xl text-gray-800 shadow-lg transition-all hover:scale-105 hover:bg-gray-100 md:h-20 md:text-3xl"
            isDisabled={showFeedback}
            onClick={() => handleNumberClick(0)}
          >
            0
          </Button>
          <Button
            className="h-16 rounded-xl border-2 border-black bg-yellow-500 font-bold text-lg text-white shadow-lg transition-all hover:scale-105 hover:bg-yellow-600 md:h-20 md:text-xl"
            isDisabled={showFeedback}
            onClick={handleDelete}
          >
            ←
          </Button>
        </div>

        <Button
          className="h-14 w-full rounded-xl border-2 border-black bg-green-600 font-bold text-white text-xl shadow-lg transition-all hover:scale-105 hover:bg-green-700 disabled:opacity-50 md:h-16 md:text-2xl"
          isDisabled={userAnswer === "" || showFeedback}
          onClick={handleSubmit}
        >
          {getUIText("exercise", "buttons.verify", lang)}
        </Button>
      </div>
    </div>
  );
}
