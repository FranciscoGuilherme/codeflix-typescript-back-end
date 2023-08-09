import * as libClassValidator from "class-validator";
import { ClassValidatorFields } from "@seedwork/domain/validators/class-validator-fields";

class StubClassValidator extends ClassValidatorFields<{ field: string }> {}

describe("Unit tests for class validator generic class", (): void => {
  it("should initialize errors and validatedData variables with null", (): void => {
    const validator: StubClassValidator = new StubClassValidator();

    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toBeNull();
  });

  it("should validate with errors", (): void => {
    const validator: StubClassValidator = new StubClassValidator();
    const spyValidateSync: jest.SpyInstance<libClassValidator.ValidationError[]> =
      jest.spyOn(libClassValidator, "validateSync").mockReturnValue([
        {
          property: "field",
          constraints: { isRequired: "some error" }
        }
      ]);

    expect(validator.validatedData).toBeNull();
    expect(validator.validate(null)).toBeFalsy();
    expect(validator.errors).toStrictEqual({ field: ["some error"] });
    expect(spyValidateSync).toHaveBeenCalled();
  });

  it("should validate without errors", (): void => {
    const validator: StubClassValidator = new StubClassValidator();
    const spyValidateSync: jest.SpyInstance<libClassValidator.ValidationError[]> =
      jest.spyOn(libClassValidator, "validateSync").mockReturnValue([]);

    expect(validator.errors).toBeNull();
    expect(validator.validate({ field: "value" })).toBeTruthy();
    expect(validator.validatedData).toStrictEqual({ field: "value" });
    expect(spyValidateSync).toHaveBeenCalled();
  });
});
