import type { ReactNode } from "react";

export type BlockPlaceholderProps = {
  data: Record<string, unknown>;
  className?: string;
};

export function BlockPlaceholder(props: BlockPlaceholderProps): ReactNode {
  const typename = (props.data.__typename as string) || "Unknown";
  const ui = (props.data.ui as string) || "unknown";
  const title = `${typename} with UI "${ui}" cannot be displayed`;
  const description = "Check the CMS";

  return (
    <div
      className={`flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed bg-gray-50 p-8 ${props.className || ""}`}
    >
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-4 rounded-full bg-gray-200 p-4">
          <svg
            aria-label="Lightbulb icon"
            className="h-12 w-12 text-gray-400"
            fill="none"
            role="img"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Lightbulb icon</title>
            <path
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
        {/* Title */}
        <h3 className="mb-2 font-semibold text-gray-700 text-xl">{title}</h3>
        {/* Description */}
        <p className="max-w-md text-gray-500 text-sm">{description}</p>
        {/* Debug Data  */}
        <details className="mt-6 w-full max-w-2xl">
          <summary className="cursor-pointer rounded bg-gray-200 px-4 py-2 text-left font-medium text-gray-700 text-sm hover:bg-gray-300">
            Debug Data (Development Only)
          </summary>
          <pre className="mt-2 overflow-auto rounded bg-gray-100 p-4 text-left text-gray-600 text-xs">
            {JSON.stringify(props.data, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
