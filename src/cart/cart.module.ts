import { Module } from '@nestjs/common';
import { CartController } from './controller/cart.controller';
import { CartService } from './service/cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/ProductEntity/product.entity';
import { CartEntity } from './entity/cart.entity';
import { UserEntity } from 'src/auth/UserEntity/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CartEntity, UserEntity]),
    ConfigModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
