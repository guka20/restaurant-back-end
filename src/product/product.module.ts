import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './ProductEntity/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PaginationModule } from '@app/restaurant';
import { CartItemEntity } from 'src/cart-item/entity/cartitem.entity';
import { AdminEntity } from 'src/auth/UserEntity/admin.entity';
@Module({
  imports: [
    JwtModule,
    ConfigModule,
    PaginationModule,
    TypeOrmModule.forFeature([ProductEntity, AdminEntity, CartItemEntity]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
