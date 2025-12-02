import type { BlockPlaceholderProps } from "./block-placeholder";

export const mockBlockPlaceholderProps: BlockPlaceholderProps = {
  data: {
    __typename: "ContentPlaceholder",
    ui: "default",
  },
};

export const mockBlockPlaceholderWithData: BlockPlaceholderProps = {
  data: {
    __typename: "MissingContent",
    ui: "custom",
    entryId: "abc123",
    contentType: "example",
    status: "missing",
    timestamp: new Date().toISOString(),
  },
};

export const mockBlockPlaceholderMinimal: BlockPlaceholderProps = {
  data: {
    __typename: "EmptyContent",
    ui: "minimal",
  },
};
