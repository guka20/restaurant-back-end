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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'login user' })
  @Post('login')
  async logInUser(@Body() loginDto: LogInDto) {
    return this.authService.logInUser(loginDto);
  }

  @Post()
  @ApiOperation({ summary: 'register user' })
  @ApiResponse({ status: 409, description: 'email already in use' })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async createUser(
    @UploadedFile() image: Express.Multer.File,
    @Body() userDto: CreateUserDto,
  ): Promise<void> {
    this.authService.createUser(userDto, image.path);
  }
}
