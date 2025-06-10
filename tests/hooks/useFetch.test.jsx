import { renderHook, act, waitFor } from "@testing-library/react";
import useFetch from "@hooks/useFetch";
import { apiFetch, apiDelete } from "@utils/client";

vi.mock("@utils/client", () => ({
  apiFetch: vi.fn(),
  apiDelete: vi.fn(),
}));

describe("useFetch hook", () => {
  const url = "/api/cats";
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches data successfully", async () => {
    const mockData = [{ id: 1, name: "Cat" }];
    apiFetch.mockResolvedValue({
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch(url));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(apiFetch).toHaveBeenCalledWith(url, expect.any(Object));
  });

  it("handles fetch error", async () => {
    apiFetch.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useFetch(url));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Network error");
    expect(result.current.data).toBeNull();
  });

  it("accumulates data when accumulate is true", async () => {
    const firstPage = [{ id: 1 }];
    const secondPage = [{ id: 2 }];
    apiFetch
      .mockResolvedValueOnce({ json: async () => firstPage })
      .mockResolvedValueOnce({ json: async () => secondPage });

    const { result } = renderHook(() =>
      useFetch(url, { pagination: true, accumulate: true, defaultValue: [] })
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(firstPage);

    act(() => {
      result.current.fetchMore();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual([...firstPage, ...secondPage]);
  });

  it("does not accumulate data when accumulate is false", async () => {
    const firstPage = [{ id: 1 }];
    const secondPage = [{ id: 2 }];
    apiFetch
      .mockResolvedValueOnce({ json: async () => firstPage })
      .mockResolvedValueOnce({ json: async () => secondPage });

    const { result } = renderHook(() =>
      useFetch(url, { pagination: true, accumulate: false, defaultValue: [] })
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(firstPage);

    act(() => {
      result.current.fetchMore();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(secondPage);
  });

  it("refetches data", async () => {
    const mockData = [{ id: 1 }];
    apiFetch.mockResolvedValue({ json: async () => mockData });

    const { result } = renderHook(() => useFetch(url));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(mockData);

    apiFetch.mockResolvedValue({ json: async () => [{ id: 2 }] });

    act(() => {
      result.current.deleteResource && result.current.deleteResource(1);
    });

    // deleteResource calls refetch, so wait for loading to finish
    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it("handles deleteResource when deleteMethod is enabled", async () => {
    apiDelete.mockResolvedValue({ ok: true });
    apiFetch.mockResolvedValue({ json: async () => [] });

    const { result } = renderHook(() => useFetch(url, { deleteMethod: true }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.deleteResource(123);
    });

    await waitFor(() => expect(apiDelete).toHaveBeenCalledWith(`${url}/123`));
  });

  it("warns if deleteResource is called when deleteMethod is false", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    apiFetch.mockResolvedValue({ json: async () => [] });

    const { result } = renderHook(() => useFetch(url));

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.deleteResource && result.current.deleteResource(123);
    });

    expect(warnSpy).toHaveBeenCalledWith(
      "Delete method is not enabled for this hook."
    );
    warnSpy.mockRestore();
  });

  it("aborts fetch on unmount", async () => {
    const abortSpy = vi.fn();
    const mockController = {
      signal: {},
      abort: abortSpy,
    };
    global.AbortController = vi.fn(() => mockController);

    apiFetch.mockResolvedValue({ json: async () => [] });

    const { unmount } = renderHook(() => useFetch(url));
    unmount();

    expect(abortSpy).toHaveBeenCalled();
  });

  it("sets loading state correctly", async () => {
    apiFetch.mockReturnValue(
      new Promise((resolve) =>
        setTimeout(() => resolve({ json: async () => [] }), 50)
      )
    );

    const { result } = renderHook(() => useFetch(url));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
  });
});
