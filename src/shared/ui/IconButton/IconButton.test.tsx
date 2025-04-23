import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { IconButton } from "./IconButton";

describe("IconButton component", () => {
  it("Should render correctly", () => {
    render(<IconButton icon="add" />);

    const button = screen.getByRole("button", {
      name: /add/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("Should call onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<IconButton onClick={onClick} icon="menu" />);

    const button = screen.getByRole("button", {
      name: /menu/i
    });
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
