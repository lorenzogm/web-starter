import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/courses/$courseId/$subject")({
  component: SubjectLayout,
});

function SubjectLayout() {
  return <Outlet />;
}
