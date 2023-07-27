export type CategoryProperties = {
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export class Category {
  constructor(public readonly props: CategoryProperties) {
    Object.assign(this, props);
  }
}
