import { render, screen } from "@testing-library/react";
import BreedInfo from "@components/Breeds/BreedInfo";
import breeds from "../../fixtures/breeds";

describe("BreedInfo component", () => {
  it("renders breed information for a list and counts five occurrences", () => {
    console.log("Rendering BreedInfo with breeds:", breeds);
    render(<BreedInfo breeds={breeds} />);

    const breedNameElements = breeds.map((breed) =>
      screen.getByText(breed.name)
    );
    expect(breedNameElements).toHaveLength(5);

    breeds.forEach((breed) => {
      expect(screen.getByText(breed.name)).toBeInTheDocument();
      expect(screen.getByText(breed.description)).toBeInTheDocument();
      expect(screen.getByText(`Origin: ${breed.origin}`)).toBeInTheDocument();
    });
  });

  it("shows fallback when no breeds are passed", () => {
    render(<BreedInfo breeds={[]} />);
    expect(
      screen.getByText("No breed information available.")
    ).toBeInTheDocument();
  });
});
