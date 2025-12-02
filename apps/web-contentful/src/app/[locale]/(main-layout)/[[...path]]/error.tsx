"use client";

import type { ReactNode } from "react";

import { ErrorMessage } from "../../../../ui/blocks/error-message/error-message";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage(props: ErrorPageProps): ReactNode {
  return <ErrorMessage error={props.error} reset={props.reset} />;
}
