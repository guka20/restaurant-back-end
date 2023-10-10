import { PageOptionDto } from './../../../libs/restaurant/src/pagination/types/pagination.types';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from '../dto/ProductDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../ProductEntity/product.entity';
import { UserEntity } from 'src/auth/UserEntity/user.entity';
import { PaginationService } from '@app/restaurant/pagination/pagination.service';
import { PageDto } from '@app/restaurant/pagination/dto/page.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly paginationService: PaginationService,
  ) {}
  async createNewProduct(
    createProductDto: CreateProductDto,
    userId: string,
  ): Promise<void> {
    const product = this.productRepository.create(createProductDto);
    const user = await this.userRepository.findOneBy({ id: userId });
    product.owner = user;
    this.productRepository.save(product);
  }
  async getAllProducts(
    pageOptionsDto: PageOptionDto,
  ): Promise<PageDto<ProductDto>> {
    let queryBuilder = this.productRepository.createQueryBuilder('products');

    const paginatedProducts = this.paginationService.getpage(
      pageOptionsDto,
      queryBuilder,
    );
    return paginatedProducts;
  }

  async getProductById(id: string): Promise<ProductDto> {
    const product = await this.productRepository.findOne({
      where: {
        product_id: id,
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
  async updateProductById(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<void> {
    const updatedResult = await this.productRepository
      .createQueryBuilder()
      .update(ProductEntity)
      .set({ ...updateProductDto })
      .where('id = :id', { id: id })
      .execute();
    if (updatedResult.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }
  async deleteProductById(id: string): Promise<void> {
    const deletedProduct = await this.productRepository.delete(id);
    if (deletedProduct.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }
}
