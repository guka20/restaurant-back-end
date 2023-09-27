import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, LogInDto } from '../dto/UserDto';
import { AuthService } from '../service/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async logInUser(@Body() loginDto: LogInDto) {
    return this.authService.logInUser(loginDto);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async createUser(
    @UploadedFile() image: Express.Multer.File,
    @Body() userDto: CreateUserDto,
  ): Promise<void> {
    this.authService.createUser(userDto, image.path);
  }
}
