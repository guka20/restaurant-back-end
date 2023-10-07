import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './ProductEntity/product.entity';
import { UserEntity } from 'src/auth/UserEntity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PaginationModule } from '@app/restaurant';
@Module({
  imports: [
    JwtModule,
    ConfigModule,
    PaginationModule,
    TypeOrmModule.forFeature([ProductEntity, UserEntity]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
