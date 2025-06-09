import Modal from "@components/ui/Modal";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router";

vi.mock("react-router", () => {
  const actual = vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Modal component", () => {
  it("renders children content", () => {
    render(
      <Modal>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("calls navigate(-1) when overlay is clicked", () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Modal>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.click(
      screen.getByText("Modal Content").parentElement.parentElement
    );
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("does not close modal when clicking inside modal content", () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Modal>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByTestId("modal-content"));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("calls navigate(-1) when Escape key is pressed", () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Modal>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("prevents background scroll while mounted and restores on unmount", () => {
    const originalOverflow = document.body.style.overflow;

    const { unmount } = render(
      <Modal>
        <div>Modal Content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("auto");

    // Restore original overflow
    document.body.style.overflow = originalOverflow;
  });
});
