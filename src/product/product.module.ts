import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './ProductEntity/product.entity';
import { UserEntity } from 'src/auth/UserEntity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PaginationModule } from '@app/restaurant';
import { CartEntity } from 'src/cart/entity/cart.entity';
@Module({
  imports: [
    JwtModule,
    ConfigModule,
    PaginationModule,
    TypeOrmModule.forFeature([ProductEntity, UserEntity, CartEntity]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
