import { Module } from '@nestjs/common';
import { CartItemController } from './controller/cartitem.controller';
import { CartItemService } from './service/cartitem.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/ProductEntity/product.entity';
import { CartItemEntity } from './entity/cartitem.entity';
import { UserEntity } from 'src/auth/UserEntity/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CartItemEntity, UserEntity]),
    ConfigModule,
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
