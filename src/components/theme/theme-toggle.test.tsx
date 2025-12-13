import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/theme/theme-toggle";

describe("ThemeToggle", () => {
  it("toggles dark mode class on the documentElement", async () => {
    document.documentElement.classList.remove("dark");
    window.localStorage.removeItem("barhub_theme");

    render(<ThemeToggle />);

    const user = userEvent.setup();
    await user.click(
      screen.getByRole("button", { name: "Switch to dark mode" })
    );

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem("barhub_theme")).toBe("dark");
  });
});


