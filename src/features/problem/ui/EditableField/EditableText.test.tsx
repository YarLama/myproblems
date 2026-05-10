import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { EditableText } from "./EditableText";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

describe("EditableText", () => {
  const mockOnTextChange = vi.fn();
  const mockOnSave = vi.fn();
  const initialValue = "Hello World";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the initial value in a span when not editing", () => {
    render(<EditableText value={initialValue} />);
    expect(screen.getByText(initialValue)).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("should switch to editing mode when the edit button is clicked", () => {
    render(<EditableText value={initialValue} />);
    
    const editButton = screen.getByText(/edit/i);
    fireEvent.click(editButton);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByDisplayValue(initialValue)).toBeInTheDocument();
  });

  it("should call onTextChange when the input value changes", () => {
    render(<EditableText value={initialValue} onTextChange={mockOnTextChange} defaultEditingState={true} />);
    
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Value" } });
    
    expect(mockOnTextChange).toHaveBeenCalledWith("New Value");
  });

  it("should call onSave with the new value when the save button is clicked", () => {
    render(<EditableText value={initialValue} onSave={mockOnSave} defaultEditingState={true} />);
    
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Saved Value" } });
    
    const saveButton = screen.getByText(/check/i);
    fireEvent.click(saveButton);
    
    expect(mockOnSave).toHaveBeenCalledWith("Saved Value");
  });

  it("should revert to the original value when the cancel button is clicked", () => {
    render(<EditableText value={initialValue} defaultEditingState={true} />);
    
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Changed Value" } });
    
    const cancelButton = screen.getByText(/close/i);
    fireEvent.click(cancelButton);
    
    expect(screen.getByText(initialValue)).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("should render a textarea when isMultiline is true", () => {
    render(<EditableText value={initialValue} isMultiline={true} defaultEditingState={true} />);
    expect(screen.getByRole("textbox").tagName).toBe("TEXTAREA");
  });

  it("should not render EditControls when isHaveEditControls is false", () => {
    render(<EditableText value={initialValue} isHaveEditControls={false} />);
    // Since EditControls is no longer mocked, we can't easily check for a testid unless it's in the real component.
    // The real component doesn't have a testid on the wrapper. 
    // But we can check if any button is present.
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should disable the input when disabled is true", () => {
    render(<EditableText value={initialValue} defaultEditingState={true} disabled={true} />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("should update the input value when the value prop changes", () => {
    const { rerender } = render(<EditableText value={initialValue} defaultEditingState={true} />);
    const newValue = "Updated Value";
    rerender(<EditableText value={newValue} defaultEditingState={true} />);
    expect(screen.getByDisplayValue(newValue)).toBeInTheDocument();
  });
});

