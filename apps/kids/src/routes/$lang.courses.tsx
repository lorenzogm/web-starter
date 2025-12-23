import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/courses")({
  component: CoursesLayout,
});

function CoursesLayout() {
  return <Outlet />;
}
