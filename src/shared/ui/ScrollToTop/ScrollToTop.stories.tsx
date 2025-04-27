import { Meta, StoryObj } from "@storybook/react";
import { ScrollToTop } from "./ScrollToTop";
import { useRef } from "react";

const meta: Meta<typeof ScrollToTop> = {
  title: "UI/ScrollToTop",
  component: ScrollToTop,
  tags: ["autodocs"],
  argTypes: {
    thresholdY: {
      control: { type: "number", min: 0, max: 500 },
      description: "Scroll Y threshold for visible",
    },
    containerRef: {
      description: "React ref for embed component into container",
      table: {
        defaultValue: {
          summary: "window"
        }
      }
    },
  },
};

export default meta;

type Story = StoryObj<typeof ScrollToTop>;

const generateText = (rows: number) => {
  return Array.from({length: rows}, (_, i) => (
    <p key={`text-${i}`}>Text {i}</p>
  ));
}

export const Default: Story = {
  render: function RenderComponent(args) {
    const divRef = useRef<HTMLDivElement>(null)
    return (
      <div className="relative h-80 overflow-auto" ref={divRef}>
        {generateText(100)}
        <ScrollToTop thresholdY={args.thresholdY} containerRef={divRef}/>
      </div>
    );
  },
  args: {
    thresholdY: 250,
  },
};
