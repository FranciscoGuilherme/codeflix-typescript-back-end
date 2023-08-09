import { validateSync, ValidationError } from "class-validator";
import ValidatorFieldsInterface, { FieldsErrors } from "@seedwork/validators/validator-fields-interface";

export abstract class ClassValidatorFields<PropsValidated> implements ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors;
  validatedData: PropsValidated;

  validate(data: any): boolean {
    const errors: ValidationError[] = validateSync(data);

    if(errors.length) {
      this.errors = {};

      errors.forEach((error: ValidationError): void => {
        const field: string = error.property;
        this.errors[field] = Object.values(error.constraints);
      });
    }

    if(!errors.length) {
      this.validatedData = data;
    }

    return !errors.length;
  }
}
