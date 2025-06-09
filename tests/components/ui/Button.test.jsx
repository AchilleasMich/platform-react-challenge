import Button from "@components/ui/Button";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Button component", () => {
  it("renders children text", () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn(); // using vitest's mock function
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(
      <Button onClick={() => {}} className="custom-class">
        Click
      </Button>
    );
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("spreads rest props", () => {
    render(
      <Button onClick={() => {}} aria-label="test-btn">
        Click
      </Button>
    );
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "test-btn"
    );
  });

  it("renders with default styles", () => {
    render(<Button onClick={() => {}}>Default Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 transition"
    );
  });
});
