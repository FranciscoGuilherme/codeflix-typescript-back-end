import { CategoryProperties } from "../entities/category";
import { ClassValidatorFields } from "@seedwork/domain/validators/class-validator-fields";
import {
  IsDate,
  IsString,
  MaxLength,
  IsBoolean,
  IsNotEmpty,
  IsOptional
} from "class-validator";

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor(data: CategoryProperties) {
    Object.assign(this, data);
  }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(data: CategoryRules): boolean {
    return super.validate(new CategoryRules(data));
  }
}
