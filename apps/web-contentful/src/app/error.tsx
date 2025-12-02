"use client";

import { logger } from "@repo/logger/dist";

type GlobalErrorProps = {
  error?: Error;
  reset?: () => void;
};

export default function GlobalError(props: GlobalErrorProps) {
  logger.error("Global error caught", props.error);

  return (
    <html lang="en">
      <body>
        <main className="flex flex-1">Error</main>
      </body>
    </html>
  );
}
