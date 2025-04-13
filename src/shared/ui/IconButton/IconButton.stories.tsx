import { Meta, StoryObj } from "@storybook/react";
import {
  IconButton,
  Icons,
  IconsHoverVariant,
  IconsSizes,
} from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "UI/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "select",
      options: Object.keys(Icons) as Array<
        keyof typeof Icons
      >,
      description: "Icon choose",
    },
    size: {
      control: "radio",
      options: IconsSizes,
      defaultValue: "md",
      description: "Button size",
    },
    hoverVariant: {
      control: "select",
      options: IconsHoverVariant,
      defaultValue: "default",
      description: "Hover variant"
    }
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: "menu",
  },
};

export const AllIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(
        Object.keys(Icons) as Array<keyof typeof Icons>
      ).map((icon) => (
        <div
          key={icon}
          className="flex flex-col items-center"
        >
          <IconButton icon={icon} />
          <span className="mt-2 text-sm text-gray-600">
            {icon}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const CustomStyle: Story = {
  args: {
    icon: "search",
  },
  decorators: [
    (Story) => (
      <div className="p-4 bg-blue-50 rounded-lg">
        <Story />
      </div>
    ),
  ],
};
