import { Category } from "./category";

describe("Unit tests for entity Category", (): void => {
  it("should instantiate Category", (): void => {
    const category: Category = new Category({ name: "Movie" });

    expect(category).toBeDefined();
    expect(category).toBeInstanceOf(Category);
  });

  it("should validate constructor category with default values", (): void => {
    const category: Category = new Category({ name: "Movie" });

    expect(category.props.name).toBe("Movie");
    expect(category.props.description).toBeUndefined();
    expect(category.props.isActive).toBeUndefined();
    expect(category.props.createdAt).toBeUndefined();
  });

  it("should validate constructor category", (): void => {
    const date = new Date();
    const category: Category = new Category({
      name: "Movie",
      description: "Some description",
      isActive: false,
      createdAt: date
    });

    expect(category.props.name).toBe("Movie");
    expect(category.props.description).toBe("Some description");
    expect(category.props.isActive).toBeFalsy();
    expect(category.props.createdAt).toBe(date);
    expect(category.props.createdAt).toBeInstanceOf(Date);
  });
});
