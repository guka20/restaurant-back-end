import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
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
import { PageDto } from '@app/restaurant/pagination/dto/page.dto';
import { PageOptionDto } from '@app/restaurant/pagination/types/pagination.types';

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
  async getAllProducts(
    @Query() pageOptionDto: PageOptionDto,
  ): Promise<PageDto<ProductDto>> {
    return this.productService.getAllProducts(pageOptionDto);
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
