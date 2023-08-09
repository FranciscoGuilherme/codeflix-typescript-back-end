import CategoryValidatorFactory from "./category.validator.factory";
import { CategoryRules, CategoryValidator } from "./category.validator";

describe("Unit and Integration tests for entity category", (): void => {
  let validator: CategoryValidator;

  beforeEach((): void => {
    validator = CategoryValidatorFactory.create();
  });

  it("should test invalid cases for name field", (): void => {
    type InvalidCasesProperties = { value: any; errors: string[]; };
    const invalidCases: InvalidCasesProperties[] = [
      {
        value: null,
        errors: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ]
      },
      {
        value: "",
        errors: [
          "name should not be empty"
        ]
      },
      {
        value: 5,
        errors: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ]
      },
      {
        value: "t".repeat(256),
        errors: [
          "name must be shorter than or equal to 255 characters"
        ]
      }
    ];

    invalidCases.forEach((item: InvalidCasesProperties): void => {
      expect({ validator, data: { name: item.value } }).containsErrorMessage({
        name: item.errors
      });
    });
  });

  it("should test invalid cases for description field", (): void => {
    expect({ validator, data: { description: 5 } }).containsErrorMessage({
      description: [
        "description must be a string"
      ]
    });
  });

  it("should test invalid cases for isActive field", (): void => {
    type InvalidCasesProperties = { value: any; };
    const invalidCases: InvalidCasesProperties[] = [
      { value: 5 },
      { value: 5.0 },
      { value: " " },
      { value: null },
      { value: true },
      { value: false },
      { value: undefined },
      { value: "t".repeat(256) }
    ];

    invalidCases.forEach((item: InvalidCasesProperties): void => {
      expect({ validator, data: { isActive: item.value } }).containsErrorMessage({
        isActive: [
          "isActive must be a boolean"
        ]
      });
    });
  });

  it("should be valid", (): void => {
    type ValidCasesProperties = { name: string; description?: string; isActive?: boolean; };
    const validCases: ValidCasesProperties[] = [
      { name: "Documentary" },
      { name: "Documentary", description: "Description" },
      { name: "Documentary", isActive: false },
      { name: "Documentary", isActive: true }
    ];

    validCases.forEach((category: ValidCasesProperties): void => {
      expect(validator.validate(category)).toBeTruthy();
      expect(validator.validatedData).toStrictEqual(new CategoryRules(category));
    });
  });
});
