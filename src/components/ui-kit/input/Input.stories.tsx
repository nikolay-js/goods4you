import { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

import "./style.css";

const meta: Meta<typeof Input> = {
  title: 'Компоненты/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'search',
    placeholder: 'Placeholder',
  },
};

export const FilledOn: Story = {
  args: {
    type: 'search',
    value: 'Macbook',
  },
};
