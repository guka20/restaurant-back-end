import {
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto, LogInDto, UserDto } from '../dto/UserDto';
import { QueryFailedError, Repository } from 'typeorm';
import { UserEntity } from '../UserEntity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from '@app/restaurant/encrypt/service/encrypt.service';
import { AdminEntity } from '../UserEntity/admin.entity';
import { CartEntity } from 'src/cart/entity/cart.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private authRepository: Repository<UserEntity>,
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    private readonly encryptService: EncryptService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async logInUser(@Body() logInDto: LogInDto) {
    const user = await this.authRepository.findOneBy({ email: logInDto.email });

    const admin = await this.adminRepository.findOneBy({
      email: logInDto.email,
    });
    if (!user && !admin)
      throw new HttpException('Invalid email address', HttpStatus.BAD_REQUEST);

    let isPasswordCorrect = await this.encryptService.validatePassword(
      user ? user.password : admin.password,
      logInDto.password,
    );
    if (!isPasswordCorrect)
      throw new HttpException('Password is not correct', HttpStatus.FORBIDDEN);

    const payload = {
      sub: user ? user.id : admin.id,
      username: user ? user.fullname : admin.fullname,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async createUser(userDto: CreateUserDto): Promise<void> {
    const newUser = {
      ...userDto,
    };
    newUser.password = await this.encryptService.hashPassword(userDto.password);
    const newCart = this.cartRepository.create();
    const car = await this.cartRepository.save(newCart);
    const user = this.authRepository.create(newUser);
    user.cart = car;
    await this.authRepository.save(user).catch((err: QueryFailedError) => {
      if (err.driverError.code == 'ER_DUP_ENTRY')
        throw new HttpException('email already in use', HttpStatus.CONFLICT);
      throw err;
    });
  }

  async getUseById(id: string, tokenId: string): Promise<UserDto> {
    const user = await this.authRepository.findOne({
      where: { id },
    });
    if (!user || tokenId !== id) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
