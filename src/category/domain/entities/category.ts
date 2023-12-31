import Entity from "@seedwork/domain/entity/entity";
import UniqueEntityId from "@seedwork/domain/value-objects/unique-entity-id.vo";
import { CategoryValidator } from "../validators/category.validator";
import CategoryValidatorFactory from "../validators/category.validator.factory";
import { EntityValidationError } from "@seedwork/domain/errors/validation-error";

export type CategoryProperties = {
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    Category.validate(props);
    super(props, id);
    this._description = props.description;
    this._createdAt = props.createdAt;
    this._isActive = props.isActive;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get isActive(): boolean | undefined {
    return this.props.isActive;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  private set _name(value: string) {
    this.props.name = value;
  }

  private set _description(value: string | undefined) {
    this.props.description = value ?? undefined;
  }

  private set _isActive(value: boolean | undefined) {
    this.props.isActive = value ?? true;
  }

  private set _createdAt(value: Date | undefined) {
    this.props.createdAt = value ?? new Date();
  }

  public update(name: string, description?: string): void {
    Category.validate({
      name: name,
      description: description
    });
    this._name = name;
    this._description = description;
  }

  static validate(props: CategoryProperties): void {
    const validator: CategoryValidator = CategoryValidatorFactory.create();
    const isValid: boolean = validator.validate(props);

    if(!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public activate(): void {
    this._isActive = true;
  }

  public deactivate(): void {
    this._isActive = false;
  }
}
