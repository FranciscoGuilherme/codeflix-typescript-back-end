import { omit } from "lodash";
import { Category } from "./category";
import { validate as uuidValidate } from "uuid";

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
    expect(category.props.isActive).toBeTruthy();
    expect(category.props.createdAt).toBeInstanceOf(Date);
    expect(omit(category.props, "createdAt")).toStrictEqual({
      name: "Movie",
      description: undefined,
      isActive: true
    });
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
    expect(omit(category.props, "createdAt")).toStrictEqual({
      name: "Movie",
      description: "Some description",
      isActive: false
    });
  });

  it("should validate all properties getters and setters", (): void => {
    const date = new Date();
    const category = new Category({ name: "Documentary" });

    expect(category.name).toBe("Documentary")
    expect(category.description).toBeUndefined();
    expect(category.isActive).toBeTruthy();
    expect(category.createdAt).toBeInstanceOf(Date);

    category["_description"] = "This is a documentary";
    category["_isActive"] = false;
    category["_createdAt"] = date;

    expect(category.description).toBe("This is a documentary");
    expect(category.isActive).toBeFalsy();
    expect(category.createdAt).toBe(date);
    expect(category.createdAt).toBeInstanceOf(Date);
  });

  it("should create a category with invalid id property", (): void => {
    const categoryCases = [
      { category: new Category({ name: "Movie" }), valid: true },
      { category: new Category({ name: "Movie" }, "1"), valid: false },
      { category: new Category({ name: "Movie" }, null), valid: true },
      { category: new Category({ name: "Movie" }, undefined), valid: true }
    ];

    categoryCases.forEach(item => {
      expect(item.category.id).not.toBeNull();
      expect(uuidValidate(item.category.id)).toBe(item.valid);
    });
  });

  it("should create a category with id property fixed", (): void => {
    const uuid: string = "9a3119a2-5d61-413f-816b-1b29e6bcda8b";
    const category = new Category({ name: "Movie" }, uuid);

    expect(category.id).toBe(uuid);
    expect(category.id).not.toBeNull();
    expect(uuidValidate(category.id)).toBeTruthy();
  });
});
