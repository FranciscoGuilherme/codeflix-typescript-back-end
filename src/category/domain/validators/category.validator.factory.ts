import { CategoryValidator } from "./category.validator";

export default class CategoryValidatorFactory {
  static create(): CategoryValidator {
    return new CategoryValidator();
  }
}
