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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductGuard } from '../guard/product.guard';
import { PageDto } from '@app/restaurant/pagination/dto/page.dto';
import { PageOptionDto } from '@app/restaurant/pagination/types/pagination.types';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('new')
  @UseGuards(ProductGuard)
  @ApiOperation({ summary: 'create product' })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Request() request: Request,
  ) {
    const userId = request['user'].sub;
    this.productService.createNewProduct(createProductDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Products' })
  async getAllProducts(
    @Query() pageOptionDto: PageOptionDto,
  ): Promise<PageDto<ProductDto>> {
    return this.productService.getAllProducts(pageOptionDto);
  }

  @Get(':product_id')
  @ApiOperation({ summary: 'Get Product By Id' })
  async getProductById(
    @Param('product_id', new ParseUUIDPipe()) productId: string,
  ): Promise<ProductDto> {
    return this.productService.getProductById(productId);
  }

  @Patch(':product_id')
  @UseGuards(ProductGuard)
  @ApiOperation({ summary: 'Update Product By Id' })
  async updateProductById(
    @Param('product_id', new ParseUUIDPipe()) productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<void> {
    this.productService.updateProductById(productId, updateProductDto);
  }
  @Delete(':product_id')
  @UseGuards(ProductGuard)
  @ApiOperation({ summary: 'Delete Product By Id' })
  async deleteProductById(
    @Param('product_id', new ParseUUIDPipe()) productId: string,
  ): Promise<void> {
    this.productService.deleteProductById(productId);
  }
}
