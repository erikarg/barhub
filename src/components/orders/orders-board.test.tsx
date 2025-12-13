import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrdersBoard } from "@/components/orders/orders-board";

describe("OrdersBoard", () => {
  it("advances an order status when clicking the primary action button", async () => {
    window.localStorage.removeItem("barhub_demo_orders");
    render(<OrdersBoard />);

    const user = userEvent.setup();

    expect(screen.getAllByText("Pending").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Start Preparing" }));

    expect(screen.getAllByText("Preparing").length).toBeGreaterThan(0);
  });
});


