import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { EditableTest } from "./EditableTest";
import { vi, describe, it, expect, afterEach } from "vitest";

describe("EditableTest", () => {
  const constants = {
    tests: {
      input: [[1, 2], [3, 4]],
      output: [3, 7],
    },
    selectors: {
      save: /check|save/i,
      cancel: /close|cancel/i,
      add: /add/i,
      delete: /delete/i,
    }
  };

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const setup = (props = {}) => {
    const onChange = vi.fn();
    const utils = render(
      <EditableTest
        tests={constants.tests}
        onChange={onChange}
        {...props}
      />
    );
    return { ...utils, onChange };
  };

  describe("1. Initial Rendering", () => {
    it("should render test data correctly in read-only mode", () => {
      setup();
      expect(screen.getByText("1,2")).toBeInTheDocument();
      expect(screen.getByText("3,4")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
      expect(screen.getByText("7")).toBeInTheDocument();
    });
  });

  describe("2. Callback & Data Integrity", () => {
    it("should call onChange with correctly parsed JSON values", () => {
      const { onChange } = setup({ defaultEditingState: true });

      const inputs = screen.getAllByRole("textbox");

      fireEvent.change(inputs[0], { target: { value: "10, 20" } });
      fireEvent.change(inputs[1], { target: { value: "30" } });

      fireEvent.click(screen.getByRole("button", { name: constants.selectors.save }));

      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        input: expect.arrayContaining([[10, 20], [3, 4]]),
        output: expect.arrayContaining([30, 7])
      }));
    });
  });

  describe("3. Behavior (Row Management)", () => {
    it("should add a new empty row and handle its input", () => {
      setup({ defaultEditingState: true });

      fireEvent.click(screen.getByRole("button", { name: constants.selectors.add }));

      const allInputs = screen.getAllByRole("textbox");
      expect(allInputs.length).toBe(6);
    });

    it("should revert changes on cancel click", () => {
      setup({ defaultEditingState: true });

      const input = screen.getAllByRole("textbox")[0];
      fireEvent.change(input, { target: { value: "999" } });
      fireEvent.click(screen.getByRole("button", { name: constants.selectors.cancel }));

      expect(screen.getByText("1,2")).toBeInTheDocument();
      expect(screen.queryByText("999")).not.toBeInTheDocument();
    });
  });

  describe("4. Error Handling", () => {
    it("should highlight field with red border on invalid JSON", () => {
      setup({ defaultEditingState: true });

      const input = screen.getAllByRole("textbox")[0];

      fireEvent.change(input, { target: { value: "[1, " } });

      const cell = input.closest('div');
      expect(cell).toHaveClass("border-red-500");
    });
  });
});
