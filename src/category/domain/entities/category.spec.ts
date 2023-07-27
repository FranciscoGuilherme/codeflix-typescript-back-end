import { Category } from "./category";

describe("Unit tests for entity Category", (): void => {
  it("should instantiate Category", (): void => {
    const category: Category = new Category({ name: "Movie" });
    expect(category.props.name).toEqual("Movie");
  });
});
