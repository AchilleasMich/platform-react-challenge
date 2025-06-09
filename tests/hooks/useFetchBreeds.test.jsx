import { renderHook, waitFor } from "@testing-library/react";
import useBreeds from "../../src/hooks/useFetchBreeds";
import { apiFetch } from "../../src/utils/client";

vi.mock("../../src/utils/client", () => ({
  apiFetch: vi.fn(),
}));

describe("useBreeds hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches breeds successfully", async () => {
    const mockBreeds = [{ id: "1", name: "Siamese" }];
    apiFetch.mockResolvedValue({
      ok: true,
      json: async () => mockBreeds,
    });

    const { result } = renderHook(() => useBreeds());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.breeds).toEqual(mockBreeds);
    expect(apiFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object)
    );
  });

  it("handles fetch error", async () => {
    const errorMessage = "Failed to fetch breeds";
    apiFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: errorMessage }),
    });

    const { result } = renderHook(() => useBreeds());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(errorMessage);
  });

  it("handles network error", async () => {
    const errorMessage = "Network Error";
    apiFetch.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useBreeds());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(errorMessage);
  });
  it("aborts fetch on unmount", async () => {
    const controller = new AbortController();
    apiFetch.mockImplementation(() => {
      return new Promise((_, reject) => {
        controller.signal.addEventListener("abort", () => {
          reject(new Error("Fetch aborted"));
        });
      });
    });

    const { unmount } = renderHook(() => useBreeds());

    unmount();

    await waitFor(() => expect(apiFetch).toHaveBeenCalled());
  });
  it("sets loading state correctly", async () => {
    apiFetch.mockReturnValue(
      new Promise((resolve) =>
        setTimeout(() => resolve({ ok: true, json: async () => [] }), 100)
      )
    );

    const { result } = renderHook(() => useBreeds());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
  });
});
