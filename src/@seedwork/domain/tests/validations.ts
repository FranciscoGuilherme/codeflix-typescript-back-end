import CustomMatcherResult = jest.CustomMatcherResult;
import { FieldsErrors } from "@seedwork/domain/validators/validator-fields-interface";
import { ClassValidatorFields } from "@seedwork/domain/validators/class-validator-fields";

type Expected = { validator: ClassValidatorFields<any>; data: any; };

expect.extend({
  containsErrorMessage(
    expected: Expected,
    received: FieldsErrors
  ): CustomMatcherResult | Promise<CustomMatcherResult> {
    const isValid: boolean = expected.validator.validate(expected.data);

    if(isValid) {
      return {
        pass: false,
        message: (): string => "The data is valid"
      };
    }

    const isMatch = expect
      .objectContaining(received)
      .asymmetricMatch(expected.validator.errors);

    if(!isMatch) {
      return {
        pass: true,
        message: (): string => {
          const errors: string = JSON.stringify(expected.validator.errors);

          return `The validations errors not contains ${JSON.stringify(errors)}`
        }
      };
    }

    return { pass: true,  message: (): string => "" };
  }
});
