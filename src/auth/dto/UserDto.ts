import { UserRole } from 'src/types/user.types';
import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';
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

  @MinLength(6)
  @MaxLength(12)
  @ApiProperty({ description: 'min 6 max 12 symbols' })
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  image: string;
}

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;
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
