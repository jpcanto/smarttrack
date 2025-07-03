import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Event } from '../interfaces/category.interface';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly description: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  readonly events: Event[];
}
