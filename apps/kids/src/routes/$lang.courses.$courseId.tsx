import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/courses/$courseId")({
  component: CourseLayout,
});

function CourseLayout() {
  return <Outlet />;
}
