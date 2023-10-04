import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';

@Module({})
export class ProductModule {
  controllers: [ProductController];
  provider: [ProductService];
}
