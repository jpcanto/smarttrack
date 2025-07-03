import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePlayerDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly ranking: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly rankingPosition: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly imageUrl: string;
}
