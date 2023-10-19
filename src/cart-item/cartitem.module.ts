import { Module } from '@nestjs/common';
import { CartItemController } from './controller/cartitem.controller';
import { CartItemService } from './service/cartitem.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/ProductEntity/product.entity';
import { CartItemEntity } from './entity/cartitem.entity';
import { UserEntity } from 'src/auth/UserEntity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { CartEntity } from 'src/cart/entity/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      CartItemEntity,
      UserEntity,
      CartEntity,
    ]),
    ConfigModule,
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
