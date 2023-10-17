import { Module } from '@nestjs/common';
import { CartController } from './controller/cart.controller';
import { CartService } from './service/cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from 'src/cart-item/entity/cartitem.entity';
import { UserEntity } from 'src/auth/UserEntity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { CartEntity } from './entity/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItemEntity, UserEntity, CartEntity]),
    ConfigModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
