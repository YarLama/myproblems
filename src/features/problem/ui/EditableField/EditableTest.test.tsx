import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { EditableTest } from "./EditableTest";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

describe("EditableTest", () => {
  const mockOnChange = vi.fn();
  const initialTests = {
    input: [[1], [2]],
    output: [[10], [20]],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the initial tests in view mode", () => {
    render(<EditableTest tests={initialTests} onChange={mockOnChange} />);
    
    // displayValue removes brackets for single-element arrays in view mode
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("[10]")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("[20]")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("should switch to editing mode when the edit button is clicked", () => {
    render(<EditableTest tests={initialTests} onChange={mockOnChange} />);
    
    const editButton = screen.getByText(/edit/i);
    fireEvent.click(editButton);

    expect(screen.getAllByRole("textbox")).toHaveLength(4);
  });

  it("should call onChange with correctly parsed data when save is clicked", () => {
    render(<EditableTest tests={initialTests} onChange={mockOnChange} defaultEditingState={true} />);
    
    const textboxes = screen.getAllByRole("textbox");
    // Update first row input to [1, 2]
    fireEvent.change(textboxes[0], { target: { value: "1, 2" } });
    // Update first row output to [3, 4] (must be valid JSON array string)
    fireEvent.change(textboxes[1], { target: { value: "[3, 4]" } });

    const saveButton = screen.getByText(/check/i); // icon="ok" -> content="check"
    fireEvent.click(saveButton);

    expect(mockOnChange).toHaveBeenCalledWith({
      input: [[1, 2], [2]],
      output: [[3, 4], [20]],
    });
  });

  it("should add a new row when add button is clicked in editing mode", () => {
    render(<EditableTest tests={initialTests} onChange={mockOnChange} defaultEditingState={true} />);
    
    const addButton = screen.getByText(/add/i); // icon="add" -> content="add"
    fireEvent.click(addButton);

    expect(screen.getAllByRole("textbox")).toHaveLength(6);
  });

  it("should delete a row when delete button is clicked", () => {
    render(<EditableTest tests={initialTests} onChange={mockOnChange} defaultEditingState={true} />);
    
    const deleteButtons = screen.getAllByText(/delete/i); // icon="delete" -> content="delete"
    fireEvent.click(deleteButtons[0]);

    expect(screen.getAllByRole("textbox")).toHaveLength(2);
  });

  it("should show error styling when invalid JSON is entered", () => {
    render(<EditableTest tests={initialTests} onChange={mockOnChange} defaultEditingState={true} />);
    
    const textboxes = screen.getAllByRole("textbox");
    fireEvent.change(textboxes[0], { target: { value: "invalid-json" } });

    // Check for error classes (from component definition)
    const errorContainer = textboxes[0].closest('div');
    expect(errorContainer).toHaveClass("border-red-500");
  });

  it("should revert to original values when cancel is clicked", () => {
    render(<EditableTest tests={initialTests} onChange={mockOnChange} defaultEditingState={true} />);
    
    const textboxes = screen.getAllByRole("textbox");
    fireEvent.change(textboxes[0], { target: { value: "changed" } });

    const cancelButton = screen.getByText(/close/i); // icon="cancel" -> content="close"
    fireEvent.click(cancelButton);

    // After cancel, isEditing should be false, so we check the span text instead of the input value
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("should not render EditControls when isHaveEditControls is false", () => {
    render(<EditableTest tests={initialTests} onChange={mockOnChange} isHaveEditControls={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should synchronize with the tests prop when it changes", () => {
    const { rerender } = render(<EditableTest tests={initialTests} onChange={mockOnChange} />);
    
    const newTests = {
      input: [[100]],
      output: [[200]],
    };
    
    rerender(<EditableTest tests={newTests} onChange={mockOnChange} />);
    
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("[200]")).toBeInTheDocument();
  });
});
