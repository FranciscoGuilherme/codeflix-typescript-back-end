import CustomMatcherResult = jest.CustomMatcherResult;
import { FieldsErrors } from "@seedwork/domain/validators/validator-fields-interface";
import { ClassValidatorFields } from "@seedwork/domain/validators/class-validator-fields";
import { EntityValidationError } from "@seedwork/domain/errors/validation-error";

type Expected = { validator: ClassValidatorFields<any>; data: any; } | (() => any);

expect.extend({
  containsErrorMessage(
    expected: Expected,
    received: FieldsErrors
  ): CustomMatcherResult | Promise<CustomMatcherResult> {
    const successScenario: CustomMatcherResult = {
      pass: false,
      message: (): string => "The data is valid"
    };

    if(typeof expected === "function") {
      try {
        expected();

        return successScenario;
      } catch(error: any) {
        const e: EntityValidationError = error as EntityValidationError;

        return checkIsMatch(received, e.error);
      }
    }

    const isValid: boolean = expected.validator.validate(expected.data);

    if(isValid) {
      return successScenario;
    }

    return checkIsMatch(received, expected.validator.errors);
  }
});

const checkIsMatch = (
  errors: FieldsErrors,
  received: FieldsErrors
): CustomMatcherResult | Promise<CustomMatcherResult> => {
  const isMatch = expect.objectContaining(received).asymmetricMatch(errors);

  if(!isMatch) {
    return {
      pass: true,
      message: (): string => {
        const e: string = JSON.stringify(errors);

        return `The validations errors not contains ${JSON.stringify(e)}`
      }
    };
  }

  return { pass: true,  message: (): string => "" };
};
