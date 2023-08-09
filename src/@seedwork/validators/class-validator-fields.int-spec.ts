import { ClassValidatorFields } from "@seedwork/validators/class-validator-fields";
import {
  IsNumber,
  IsString,
  MaxLength,
  IsNotEmpty
} from "class-validator";

class StubRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

class StubClassValidator extends ClassValidatorFields<StubRules> {
  validate(data: any): boolean {
    return super.validate(new StubRules(data));
  }
}

describe("Integration tests for class validator generic class", ():void => {
  it("should validate with errors", (): void => {
    const validator: StubClassValidator = new StubClassValidator();

    expect(validator.validate(null)).toBeFalsy();
    expect(validator.errors).toStrictEqual({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters"
      ],
      price: [
        "price should not be empty",
        "price must be a number conforming to the specified constraints"
      ]
    });
  });

  it("should be valid", (): void => {
    const data: object = { name: "value", price: 5 };
    const validator: StubClassValidator = new StubClassValidator();

    expect(validator.validate(data)).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(new StubRules(data));
  });
});
