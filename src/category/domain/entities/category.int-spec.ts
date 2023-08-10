import { Category } from "./category";

describe("Integration tests for entity Category", (): void => {
  it("should throw an error when try to create a Category with an invalid name", (): void => {
    type InvalidValuesProperties = { value: any };
    const invalidValues: InvalidValuesProperties[] = [
      { value: null },
      { value: undefined }
    ];

    invalidValues.forEach((item: InvalidValuesProperties): void => {
      expect((): void => {
        new Category({ name: item.value });
      }).containsErrorMessage({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ]
      });
    });

    expect((): void => {
      new Category({ name: "" });
    }).containsErrorMessage({ name: [ "name should not be empty" ] });

    expect((): void => {
      new Category({ name: "t".repeat(256) });
    }).containsErrorMessage({
      name: ["name must be shorter than or equal to 255 characters" ]
    });
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
      }).containsErrorMessage({
        name: [ "name must be a string" ]
      });
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
      }).containsErrorMessage({
        name: [ "name must be a boolean" ]
      });
    });
  });

  it("should throw an error when try to update a Category with an invalid name", (): void => {
    type InvalidValuesProperties = { value: any };
    const invalidValues: InvalidValuesProperties[] = [
      { value: null },
      { value: undefined }
    ];
    const category: Category = new Category({ name: "Documentary" });

    invalidValues.forEach((item: InvalidValuesProperties): void => {
      expect((): void => {
        category.update(item.value);
      }).containsErrorMessage({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ]
      });
    });

    expect((): void => {
      category.update("t".repeat(256));
    }).containsErrorMessage({
      name: [
        "name must be shorter than or equal to 255 characters"
      ]
    });
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
        category.update(null, item.value);
      }).containsErrorMessage({
        name: [
          "description must be a string",
        ]
      });
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
