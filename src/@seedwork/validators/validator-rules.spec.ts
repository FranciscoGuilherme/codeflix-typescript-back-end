import ValidatorRules from "@seedwork/validators/validator-rules";
import ValidationError from "@seedwork/errors/validation-error";

describe("Unit tests for validator rules class", (): void => {
  it("should create an instance of ValidatorRules correctly", (): void => {
    const validatorRules: ValidatorRules = ValidatorRules.values("some value", "field");

    expect(validatorRules).toBeInstanceOf(ValidatorRules);
    expect(validatorRules["value"]).toBe("some value");
    expect(validatorRules["property"]).toBe("field");
  });

  it("should validate if is required for valid fields", (): void => {
    type TypeStatusProperties = { value: any }
    const validProperties: TypeStatusProperties[] = [
      { value: 0 },
      { value: {} },
      { value: 10 },
      { value: -10 },
      { value: 10.5 },
      { value: true },
      { value: false },
      { value: "valid value" }
    ];

    validProperties.forEach((item: TypeStatusProperties): void => {
      expect((): void => {
        ValidatorRules.values(item.value, "field").required();
      }).not.toThrow(new ValidationError("The field is required"));
    });
  });

  it("should validate if is required for invalid fields", (): void => {
    type TypeStatusProperties = { value: any }
    const invalidProperties: TypeStatusProperties[] = [
      { value: "" },
      { value: null },
      { value: undefined }
    ];

    invalidProperties.forEach((item: TypeStatusProperties): void => {
      expect((): void => {
        ValidatorRules.values(item.value, "field").required();
      }).toThrow(new ValidationError("The field is required"));
    });
  });

  it("should validate if is string for valid fields", (): void => {
    type TypeStatusProperties = { value: any }
    const validProperties: TypeStatusProperties[] = [
      { value: "0" },
      { value: null },
      { value: "10" },
      { value: "-10" },
      { value: "10.5" },
      { value: "true" },
      { value: "false" },
      { value: undefined },
      { value: "valid value" },
      { value: "there is something there" }
    ];

    validProperties.forEach((item: TypeStatusProperties): void => {
      expect((): void => {
        ValidatorRules.values(item.value, "field").string();
      }).not.toThrow(new ValidationError("The field must be a string"));
    });
  });

  it("should validate if is string for invalid fields", (): void => {
    type TypeStatusProperties = { value: any }
    const validProperties: TypeStatusProperties[] = [
      { value: 0 },
      { value: {} },
      { value: 10 },
      { value: -10 },
      { value: 10.5 },
      { value: true },
      { value: false }
    ];

    validProperties.forEach((item: TypeStatusProperties): void => {
      expect((): void => {
        ValidatorRules.values(item.value, "field").string();
      }).toThrow(new ValidationError("The field must be a string"));
    });
  });

  it("should validate if has the right length", (): void => {
    type TypeStatusProperties = { value: any, length: number }
    const validProperties: TypeStatusProperties[] = [
      { value: "1", length: 10 },
      { value: null, length: 0 },
      { value: "100", length: 10 },
      { value: "2000", length: 10 },
      { value: "10.5", length: 10 },
      { value: "true", length: 10 },
      { value: "false", length: 10 },
      { value: "string", length: 10 },
      { value: undefined, length: 0 }
    ];

    validProperties.forEach((item: TypeStatusProperties): void => {
      expect((): void => {
        ValidatorRules.values(item.value, "field").maxLength(item.length);
      }).not.toThrow(
        new ValidationError(
          `The field must be less or equal then ${item.length} characters`
        )
      );
    });
  });

  it("should validate if has the wrong length", (): void => {
    type TypeStatusProperties = { value: any, length: number }
    const validProperties: TypeStatusProperties[] = [
      { value: "100", length: 2 },
      { value: "2000", length: 2 },
      { value: "10.5", length: 2 },
      { value: "true", length: 2 },
      { value: "false", length: 2 },
      { value: "string", length: 2 }
    ];

    validProperties.forEach((item: TypeStatusProperties): void => {
      expect((): void => {
        ValidatorRules.values(item.value, "field").maxLength(item.length);
      }).toThrow(
        new ValidationError(
          `The field must be less or equal then ${item.length} characters`
        )
      );
    });
  });

  it("should validate if is boolean for valid fields", (): void => {
    type TypeStatusProperties = { value: any }
    const validProperties: TypeStatusProperties[] = [
      { value: null },
      { value: true },
      { value: false },
      { value: undefined }
    ];

    validProperties.forEach((item: TypeStatusProperties): void => {
      expect((): void => {
        ValidatorRules.values(item.value, "field").boolean();
      }).not.toThrow(new ValidationError("The field must be a boolean"));
    });
  });

  it("should validate if is boolean for invalid fields", (): void => {
    type TypeStatusProperties = { value: any }
    const validProperties: TypeStatusProperties[] = [
      { value: 0 },
      { value: {} },
      { value: 10 },
      { value: -10 },
      { value: 10.5 }
    ];

    validProperties.forEach((item: TypeStatusProperties): void => {
      expect((): void => {
        ValidatorRules.values(item.value, "field").boolean();
      }).toThrow(new ValidationError("The field must be a boolean"));
    });
  });

  it("should throw an validation error when combine two or more validation rules for string operations", (): void => {
    type ScenariosProperties = { value: any; error: string; };
    const scenarios: ScenariosProperties[] = [
      { value: null, error: "The field is required" },
      { value: 5, error: "The field must be a string" },
      { value: "Something", error: "The field must be less or equal then 5 characters" }
    ];

    scenarios.forEach((scenario: ScenariosProperties): void => {
      expect((): void => {
        ValidatorRules.values(scenario.value, "field").required().string().maxLength(5)
      }).toThrow(scenario.error);
    });
  });

  it("should throw an validation error when combine two or more validation rules for boolean operations", (): void => {
    type ScenariosProperties = { value: any; error: string; };
    const scenarios: ScenariosProperties[] = [
      { value: null, error: "The field is required" },
      { value: 5, error: "The field must be a boolean" },
      { value: {}, error: "The field must be a boolean" }
    ];

    scenarios.forEach((scenario: ScenariosProperties): void => {
      expect((): void => {
        ValidatorRules.values(scenario.value, "field").required().boolean()
      }).toThrow(scenario.error);
    });
  });

  it("should validate combination of two or more validation rules for string operations", (): void => {
    jest.spyOn(ValidatorRules.prototype, "string");
    jest.spyOn(ValidatorRules.prototype, "maxLength");
    type ScenariosProperties = { value: any; error: string; };
    const scenarios: ScenariosProperties[] = [
      { value: null, error: "The field is required" },
      { value: undefined, error: "The field is required" },
      { value: "Something", error: "The field must be less or equal then 15 characters" }
    ];

    scenarios.forEach((scenario: ScenariosProperties): void => {
      expect((): void => {
        ValidatorRules.values(scenario.value, "field").string().maxLength(15)
      }).not.toThrow(scenario.error);
    });

    expect(ValidatorRules.prototype.string).toBeCalledTimes(3);
    expect(ValidatorRules.prototype.maxLength).toBeCalledTimes(3);
  });
});
