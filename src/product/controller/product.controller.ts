import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from '../dto/ProductDto';
import { ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('new')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    this.productService.createNewProduct(createProductDto);
  }

  @Get()
  async getAllProducts(): Promise<ProductDto[]> {
    return this.productService.getAllProducts();
  }

  @Get(':product_id')
  async getProductById(
    @Param('product_id', new ParseUUIDPipe()) productId: string,
  ): Promise<ProductDto> {
    return this.productService.getProductById(productId);
  }

  @Patch(':product_id')
  async updateProductById(
    @Param('product_id', new ParseUUIDPipe()) productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<void> {
    this.productService.updateProductById(productId, updateProductDto);
  }
  @Delete(':product_id')
  async deleteProductById(
    @Param('product_id', new ParseUUIDPipe()) productId: string,
  ): Promise<void> {
    this.productService.deleteProductById(productId);
  }
}
