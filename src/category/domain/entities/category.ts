import Entity from "@seedwork/domain/entity/entity";
import UniqueEntityId from "@seedwork/domain/value-objects/unique-entity-id.vo";

export type CategoryProperties = {
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
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

  private set _description(value: string | undefined) {
    this.props.description = value ?? undefined;
  }

  private set _isActive(value: boolean | undefined) {
    this.props.isActive = value ?? true;
  }

  private set _createdAt(value: Date | undefined) {
    this.props.createdAt = value ?? new Date();
  }
}
