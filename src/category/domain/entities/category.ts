export type CategoryProperties = {
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export class Category {
  constructor(public readonly props: CategoryProperties) {
    this.description = props.description;
    this.createdAt = props.createdAt;
    this.isActive = props.isActive;
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

  private set description(value: string | undefined) {
    this.props.description = value ?? undefined;
  }

  private set isActive(value: boolean | undefined) {
    this.props.isActive = value ?? true;
  }

  private set createdAt(value: Date | undefined) {
    this.props.createdAt = value ?? new Date();
  }
}
