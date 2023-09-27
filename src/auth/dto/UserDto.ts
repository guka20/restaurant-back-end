import { UserRole } from 'src/types/user.types';
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  fullname: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  @ApiProperty({ description: 'min 6 max 12 symbols' })
  password: string;

  @ApiProperty()
  image: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  @ApiProperty()
  role: UserRole;
}

export class UserDto {
  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  role: string;
}

export class LogInDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
