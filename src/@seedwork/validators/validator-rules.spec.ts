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
  })

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
});
