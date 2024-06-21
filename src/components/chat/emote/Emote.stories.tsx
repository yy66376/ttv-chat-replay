import type { Meta, StoryObj } from "@storybook/react";

import Emote from "./Emote";
import { within, userEvent, expect } from "@storybook/test";

import normalSrc from "../../../../static/emotes/FeelsGoodMan_1x.webp";
import doubleSrc from "../../../../static/emotes/FeelsGoodMan_2x.webp";
import tripleSrc from "../../../../static/emotes/FeelsGoodMan_3x.webp";

const meta: Meta<typeof Emote> = {
  tags: ["autodocs"],
  component: Emote,
  title: "Chat/Emote/Emote",
};

export default meta;
type Story = StoryObj<typeof Emote>;

export const Default: Story = {
  args: {
    author: "NightDev",
    provider: "BetterTTV",
    enlargedSrc: tripleSrc,
    name: "FeelsGoodMan",
    src: normalSrc,
    srcSet: [normalSrc, doubleSrc, tripleSrc]
      .map((src, index) => `${src} ${1 + index}x`)
      .join(", "),
  },
};

export const Hovered: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.ownerDocument.body);

    await step("Hover the emote", async () => {
      await userEvent.hover(canvas.getByRole("img"));
      const tooltip = canvas.getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
    });

    await step(
      '"Emote", "From", and "By" labels are in the tooltip.',
      async () => {
        const tooltip = canvas.getByRole("tooltip");
        const tooltipCanvas = within(tooltip);
        const emoteLabel = tooltipCanvas.getByText(/emote:/i);
        const fromLabel = tooltipCanvas.getByText(/from:/i);
        const byLabel = tooltipCanvas.getByText(/by:/i);
        [emoteLabel, fromLabel, byLabel].forEach((label) =>
          expect(label).toBeInTheDocument()
        );
      }
    );
  },
};
