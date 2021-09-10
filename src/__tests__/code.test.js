import "@testing-library/jest-dom";
import { logRoles, render, screen, within } from "@testing-library/dom";
import Header from "../components/Header";

describe("header list", () => {
  it("should have a heading of Services", () => {
    render(<Header />);
    const headingEl = screen.getByRole("heading", { name: "Services" });

    expect(headingEl).toBeInTheDocument();
  });
});
