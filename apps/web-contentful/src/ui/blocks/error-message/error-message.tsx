"use client";

import { logger } from "@repo/logger";
import { useEffect } from "react";

type ErrorMessageProps = {
  error: Error;
  reset: () => void;
};

export function ErrorMessage(props: ErrorMessageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.error(props.error.message, props.error);
  }, [props.error]);

  return (
    <div
      className="container mx-auto px-4 py-8 text-center"
      data-testid="Error"
    >
      <h1 className="mb-4 font-bold text-4xl text-red-600">
        Something went wrong!
      </h1>
      <button
        className="cursor-pointer rounded-md border-none bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => props.reset()
        }
        type="button"
      >
        Try again
      </button>
    </div>
  );
}
