import type { Meta, StoryObj } from "@storybook/react";

import Code from "./Code";

const meta: Meta<typeof Code> = {
  tags: ["autodocs"],
  component: Code,
  title: "UI/Text/Code",
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Default: Story = {
  args: {
    children: "selectAll()",
  },
};
