import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { EditableText } from "./EditableText";
import { vi, describe, it, expect, afterEach } from "vitest";

describe("EditableText", () => {
  const constants = {
    initial: "Initial Value",
    updated: "Updated Value",
    empty: "",
    selectors: {
      save: /check|save/i,
      cancel: /close|cancel/i,
      edit: /edit/i,
    }
  };

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const setup = (props = {}) => {
    const onSave = vi.fn();
    const onTextChange = vi.fn();
    const utils = render(
      <EditableText 
        value={constants.initial} 
        onSave={onSave} 
        onTextChange={onTextChange} 
        {...props} 
      />
    );
    return { ...utils, onSave, onTextChange };
  };

  describe("1. Initial Rendering", () => {
    it("should render correctly with empty and normal strings", () => {
      const { rerender } = setup({ value: constants.empty });
      expect(screen.getByText((_, el) => el?.tagName === "SPAN" && el.textContent === constants.empty)).toBeInTheDocument();

      rerender(<EditableText value={constants.initial} />);
      expect(screen.getByText(constants.initial)).toBeInTheDocument();
    });

    it("should apply configuration props correctly", () => {
      setup({ defaultEditingState: true, isMultiline: true, disabled: true });
      
      const input = screen.getByRole("textbox");
      expect(input.tagName).toBe("TEXTAREA");
      expect(input).toBeDisabled();
    });
  });

  describe("2. Callback Functions Contract", () => {
    it("should call onTextChange with exact user input", () => {
      const { onTextChange } = setup({ defaultEditingState: true });
      
      fireEvent.change(screen.getByRole("textbox"), { target: { value: constants.updated } });
      expect(onTextChange).toHaveBeenCalledWith(constants.updated);
    });

    it("should call onSave with final value when save is clicked", () => {
      const { onSave } = setup({ defaultEditingState: true });
      
      fireEvent.change(screen.getByRole("textbox"), { target: { value: constants.updated } });
      fireEvent.click(screen.getByRole("button", { name: constants.selectors.save }));

      expect(onSave).toHaveBeenCalledWith(constants.updated);
    });
  });

  describe("3. Behavior & Logical Integrity", () => {
    it("should NOT call onSave and should revert value on Cancel", () => {
      const { onSave } = setup({ defaultEditingState: true });
      
      fireEvent.change(screen.getByRole("textbox"), { target: { value: constants.updated } });
      fireEvent.click(screen.getByRole("button", { name: constants.selectors.cancel }));

      expect(onSave).not.toHaveBeenCalled();
      expect(screen.getByText(constants.initial)).toBeInTheDocument();
    });

    it("should sync with value prop updates from parent", () => {
      const { rerender } = setup({ defaultEditingState: true });
      expect(screen.getByRole("textbox")).toHaveValue(constants.initial);

      rerender(<EditableText value={constants.updated} defaultEditingState={true} />);
      expect(screen.getByRole("textbox")).toHaveValue(constants.updated);
    });
  });
});
