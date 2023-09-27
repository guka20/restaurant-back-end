import {
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto, LogInDto } from '../dto/UserDto';
import { QueryFailedError, Repository } from 'typeorm';
import { UserEntity } from '../UserEntity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptService } from '@app/restaurant/libs/restaurant/src/encrypt/service/encrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private authRepository: Repository<UserEntity>,
    private readonly encryptService: EncryptService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async logInUser(@Body() logInDto: LogInDto) {
    const user = await this.authRepository.findOneBy({ email: logInDto.email });
    if (!user)
      throw new HttpException('Invalid email address', HttpStatus.BAD_REQUEST);
    let isPasswordCorrect = await this.encryptService.validatePassword(
      user.password,
      logInDto.password,
    );
    if (!isPasswordCorrect)
      throw new HttpException('Password is not correct', HttpStatus.FORBIDDEN);

    const payload = { sub: user.id, username: user.fullname, role: user.role };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async createUser(userDto: CreateUserDto, image: string): Promise<void> {
    const newUser = {
      ...userDto,
      image,
    };
    newUser.password = await this.encryptService.hashPassword(userDto.password);
    const user = this.authRepository.create(newUser);
    await this.authRepository.save(user).catch((err: QueryFailedError) => {
      if (err.driverError.code == 'ER_DUP_ENTRY')
        throw new HttpException('email already in use', HttpStatus.CONFLICT);
      throw err;
    });
  }
}
