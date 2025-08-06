import { Meta, StoryObj } from "@storybook/react";
import {
  IconButton,
} from "./IconButton";
import {
  IconsHoverVariant,
  IconsSizes,
} from "./IconButton.types.ts"
import { Icons, iconNames } from "@constants/icons.ts";

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
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {(
        Object.keys(Icons) as Array<iconNames>
      ).map((icon, i) => (
        <div
          key={`${i}-icon`}
          className="flex flex-col items-center justify-center"
        >
          <IconButton icon={icon} size={args.size}/>
          <span className="mt-2 text-sm text-gray-600">
            {icon}
          </span>
        </div>
      ))}
    </div>
  ),
};
