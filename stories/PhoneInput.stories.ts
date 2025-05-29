import type { Meta, StoryObj } from "@storybook/react-vite";

import PhoneInput from "../resources/js/Components/Form/PhoneInput";

const meta = {
  title: "Form/Phone Input",
  component: PhoneInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
