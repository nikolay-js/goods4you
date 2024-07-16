import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

import "./style.css";

const meta: Meta<typeof Button> = {
  title: 'Компоненты/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Кнопка',
  },
};

export const Primary: Story = {
  args: {
    type: 'button',
    children: 'Кнопка',
  },
};

export const Link: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Кнопка-ссылка с анкором',
      },
    },
  },
  args: {
    href: '#',
    children: "Ссылка",
  },
};

export const Disabled: StoryObj<typeof Button> = {
  args: {
    children: "disabled",
    disabled: true,
  },
};
