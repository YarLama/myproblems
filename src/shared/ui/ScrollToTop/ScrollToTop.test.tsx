import {
  act,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ScrollToTop } from "./ScrollToTop";
import userEvent from "@testing-library/user-event";

describe("ScrollToTop UI component", () => {

  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
    document.body.innerHTML = "";
  });

  it("Should render, if scrollY > 100px", () => {
    vi.spyOn(window, "scrollY", "get").mockImplementation(
      () => 300,
    );
    render(<ScrollToTop thresholdY={100} />);

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Should not render, if scrollY < 100px", () => {
    vi.spyOn(window, "scrollY", "get").mockImplementation(
      () => 60,
    );
    render(<ScrollToTop thresholdY={100} />);

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(screen.queryByRole("button")).toBeNull();
  });

  it("Should be clicked, if visible", async () => {
    vi.spyOn(window, "scrollY", "get").mockImplementation(
      () => 110,
    );
    render(<ScrollToTop thresholdY={100} />);

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    await userEvent.click(screen.getByRole("button"));

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });
});
