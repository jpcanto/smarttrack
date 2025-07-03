import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;
}
