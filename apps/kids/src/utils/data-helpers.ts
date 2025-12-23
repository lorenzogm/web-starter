import { courses } from "@/data/courses";
import { languages } from "@/data/languages";
import { levels } from "@/data/levels";
import { subjects } from "@/data/subjects";

export function getLanguage(id: string) {
  return languages.find((lang) => lang.id === id);
}

export function getCourse(id: string) {
  return courses.find((course) => course.id === id);
}

export function getSubject(id: string) {
  return subjects.find((subject) => subject.id === id);
}

export function getCourseLevels(courseId: string, subjectId: string) {
  const courseLevels = levels.find(
    (cl) => cl.courseId === courseId && cl.subjectId === subjectId
  );
  return courseLevels?.levels || [];
}
