import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { Image } from "./image";
import { mockImageProps } from "./image.mocks";

const meta = {
  title: "Components/Image",
  component: Image,
  parameters: { layout: "centered" },
  argTypes: {
    decorative: { control: "boolean" },
    className: { control: "text" },
    src: { control: "text" },
    alt: { control: "text" },
    decorativeLabel: { control: "text" },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

const EXPECTED_IMAGE_COUNT = 3;

export const AspectRatios: Story = {
  args: mockImageProps,
  render: () => (
    <div className="flex flex-wrap gap-4">
      {/* Square aspect ratio 1:1 */}
      <div className="flex flex-col gap-2">
        <Image
          alt="Square aspect ratio example"
          src="https://placehold.co/400x400"
        />
        <p className="text-center text-sm">Square (1:1)</p>
      </div>

      {/* Four-three aspect ratio 4:3 */}
      <div className="flex flex-col gap-2">
        <Image
          alt="Four-three aspect ratio example"
          src="https://placehold.co/400x300"
        />
        <p className="text-center text-sm">Four-Three (4:3)</p>
      </div>

      {/* Sixteen-nine aspect ratio 16:9 */}
      <div className="flex flex-col gap-2">
        <Image
          alt="Sixteen-nine aspect ratio example"
          src="https://placehold.co/400x225"
        />
        <p className="text-center text-sm">Sixteen-Nine (16:9)</p>
      </div>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const images = canvas.getAllByRole("img");

    // Verify all images are rendered
    await expect(images).toHaveLength(EXPECTED_IMAGE_COUNT);

    // Verify each image has correct aspect ratio
    const squareImg = images[0];
    const fourThreeImg = images[1];
    const sixteenNineImg = images[2];

    await expect(squareImg).toHaveAttribute(
      "src",
      "https://placehold.co/400x400"
    );
    await expect(squareImg).toHaveAttribute(
      "alt",
      "Square aspect ratio example"
    );

    await expect(fourThreeImg).toHaveAttribute(
      "src",
      "https://placehold.co/400x300"
    );
    await expect(fourThreeImg).toHaveAttribute(
      "alt",
      "Four-three aspect ratio example"
    );

    await expect(sixteenNineImg).toHaveAttribute(
      "src",
      "https://placehold.co/400x225"
    );
    await expect(sixteenNineImg).toHaveAttribute(
      "alt",
      "Sixteen-nine aspect ratio example"
    );
  },
};
