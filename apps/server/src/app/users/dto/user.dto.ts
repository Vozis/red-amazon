import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'The password must be at least 6 characters long',
  })
  @IsString()
  password: string;

  @ValidateIf((object, value) => value !== null)
  name: string;

  @ValidateIf((object, value) => value !== null)
  avatarPath: string;

  @ValidateIf((object, value) => value !== null)
  phone: string;
}
