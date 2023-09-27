import { UserRole } from 'src/types/user.types';
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(100)
  fullname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string;

  image: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}

export class UserDto {
  fullname: string;
  email: string;
  password: string;
  image: string;
  role: string;
}

export class LogInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
