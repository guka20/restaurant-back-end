import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, LogInDto, UserDto } from '../dto/UserDto';
import { AuthService } from '../service/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guard/auth.guard';

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
  async createUser(@Body() userDto: CreateUserDto): Promise<void> {
    this.authService.createUser(userDto);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get User By Id' })
  @UseGuards(AuthGuard)
  async getUserById(
    @Request() req,
    @Param('uuid', new ParseUUIDPipe()) id: string,
  ): Promise<UserDto> {
    return this.authService.getUseById(id, req?.user?.sub, req?.user?.role);
  }

  @Get('')
  async getList() {
    return this.authService.getAll();
  }
}
