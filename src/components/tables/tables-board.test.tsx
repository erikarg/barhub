import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TablesBoard } from "@/components/tables/tables-board";

describe("TablesBoard", () => {
  it("seats guests on an available table", async () => {
    window.localStorage.removeItem("barhub_demo_tables");
    render(<TablesBoard />);

    const user = userEvent.setup();
    const seatButtons = screen.getAllByRole("button", { name: "Seat Guests" });
    await user.click(seatButtons[0]);

    expect(screen.getAllByRole("button", { name: "Clear" }).length).toBeGreaterThan(0);
  });
});


