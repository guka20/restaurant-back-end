import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './UserEntity/user.entity';
import { EncryptModule } from '@app/restaurant';
import { AdminEntity } from './UserEntity/admin.entity';
import { CartEntity } from 'src/cart/entity/cart.entity';
@Module({
  imports: [
    EncryptModule,
    TypeOrmModule.forFeature([UserEntity, AdminEntity, CartEntity]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
