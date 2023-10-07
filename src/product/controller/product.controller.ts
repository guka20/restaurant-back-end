import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from '../dto/ProductDto';
import { ProductService } from '../service/product.service';
import { ApiTags } from '@nestjs/swagger';
import { ProductGuard } from '../guard/product.guard';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('new')
  @UseGuards(ProductGuard)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Request() request: Request,
  ) {
    const userId = request['user'].sub;
    console.log(userId);

    this.productService.createNewProduct(createProductDto, userId);
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
  @UseGuards(ProductGuard)
  async updateProductById(
    @Param('product_id', new ParseUUIDPipe()) productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<void> {
    this.productService.updateProductById(productId, updateProductDto);
  }
  @Delete(':product_id')
  @UseGuards(ProductGuard)
  async deleteProductById(
    @Param('product_id', new ParseUUIDPipe()) productId: string,
  ): Promise<void> {
    this.productService.deleteProductById(productId);
  }
}
