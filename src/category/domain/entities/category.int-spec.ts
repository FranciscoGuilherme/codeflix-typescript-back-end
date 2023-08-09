import { Category } from "./category";
import ValidationError from "@seedwork/domain/errors/validation-error";

describe("Integration tests for entity Category", (): void => {
  it("should throw an error when try to create a Category with an invalid name", (): void => {
    type InvalidValuesProperties = { value: any };
    const invalidValues: InvalidValuesProperties[] = [
      { value: "" },
      { value: null },
      { value: undefined }
    ];

    invalidValues.forEach((item: InvalidValuesProperties): void => {
      expect((): void => {
        new Category({ name: item.value });
      }).toThrow(new ValidationError("The name is required"));
    });

    expect((): void => {
      new Category({ name: "t".repeat(256) });
    }).toThrow(new ValidationError("The name must be less or equal then 255 characters"));
  });

  it("should throw an error when try to create a Category with an invalid description", (): void => {
    type InvalidValuesProperties = { value: any };
    const invalidValues: InvalidValuesProperties[] = [
      { value: 5 },
      { value: {} },
      { value: 5.5 },
      { value: true },
      { value: false }
    ];

    invalidValues.forEach((item: InvalidValuesProperties): void => {
      expect((): void => {
        new Category({ name: "Documentary", description: item.value });
      }).toThrow(new ValidationError("The description must be a string"));
    });
  });

  it("should throw an error when try to create a Category with an invalid active status", (): void => {
    type InvalidValuesProperties = { value: any };
    const invalidValues: InvalidValuesProperties[] = [
      { value: 5 },
      { value: {} },
      { value: 5.5 },
      { value: "true" },
      { value: "false" }
    ];

    invalidValues.forEach((item: InvalidValuesProperties): void => {
      expect((): void => {
        new Category({ name: "Documentary", isActive: item.value });
      }).toThrow(new ValidationError("The isActive must be a boolean"));
    });
  });

  it("should throw an error when try to update a Category with an invalid name", (): void => {
    type InvalidValuesProperties = { value: any };
    const invalidValues: InvalidValuesProperties[] = [
      { value: "" },
      { value: null },
      { value: undefined }
    ];
    const category: Category = new Category({ name: "Documentary" });

    invalidValues.forEach((item: InvalidValuesProperties): void => {
      expect((): void => {
        category.update(item.value);
      }).toThrow(new ValidationError("The name is required"));
    });

    expect((): void => {
      category.update("t".repeat(256));
    }).toThrow(new ValidationError("The name must be less or equal then 255 characters"));
  });

  it("should throw an error when try to update a Category with an invalid description", (): void => {
    type InvalidValuesProperties = { value: any };
    const invalidValues: InvalidValuesProperties[] = [
      { value: 5 },
      { value: {} },
      { value: 5.5 },
      { value: true },
      { value: false }
    ];
    const category: Category = new Category({ name: "Documentary" });

    invalidValues.forEach((item: InvalidValuesProperties): void => {
      expect((): void => {
        category.update("Movie", item.value);
      }).toThrow(new ValidationError("The description must be a string"));
    });
  });

  it("should create a valid Category entity", (): void => {
    type PropsListProperties = { name: string; description?: string; isActive?: boolean };
    const propsList: PropsListProperties[] = [
      { name: "Documentary" },
      { name: "Documentary", description: "Some description" },
      { name: "Documentary", description: null },
      { name: "Documentary", isActive: false },
      { name: "Documentary", isActive: undefined },
      { name: "Documentary", description: "Some description", isActive: true }
    ];

    propsList.forEach((props: PropsListProperties): void => {
      const category: Category = new Category(props);

      expect(category).toBeDefined();
      expect(category).toBeInstanceOf(Category);
    });
  });
});
