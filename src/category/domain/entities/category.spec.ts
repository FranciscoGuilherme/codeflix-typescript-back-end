import { omit } from "lodash";
import { Category } from "./category";
import UniqueEntityId from "@seedwork/domain/unique-entity-id.vo";

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
    const date: Date = new Date();
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
    const date: Date = new Date();
    const category: Category = new Category({ name: "Documentary" });

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
    type CategoryData = { category: Category; valid: boolean; };
    const categoryCases: CategoryData[] = [
      { category: new Category({ name: "Movie" }), valid: false },
      { category: new Category({ name: "Movie" }, null), valid: false },
      { category: new Category({ name: "Movie" }, undefined), valid: false },
      { category: new Category({ name: "Movie" }, new UniqueEntityId()), valid: true }
    ];

    categoryCases.forEach(item => {
      expect(item.category.id).not.toBeNull();
      expect(item.category.id).toBeInstanceOf(UniqueEntityId);
    });
  });

  it("should create a category with id property fixed", (): void => {
    const uuid: string = "9a3119a2-5d61-413f-816b-1b29e6bcda8b";
    const category: Category = new Category({ name: "Movie" }, new UniqueEntityId(uuid));

    expect(category.id).not.toBeNull();
    expect(category.id).toBeInstanceOf(UniqueEntityId);
    expect(Object.getOwnPropertyNames(category.id)).toStrictEqual([ 'id' ]);
  });
});
