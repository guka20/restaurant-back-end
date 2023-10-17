import { PageOptionDto } from './../../../libs/restaurant/src/pagination/types/pagination.types';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { AdminEntity } from 'src/auth/UserEntity/admin.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly paginationService: PaginationService,
  ) {}
  async createNewProduct(
    createProductDto: CreateProductDto,
    adminId: string,
  ): Promise<void> {
    const product = this.productRepository.create(createProductDto);
    const admin = await this.adminRepository.findOneBy({ id: adminId });
    if (!admin) {
      throw new HttpException('Could not find admin', HttpStatus.NOT_FOUND);
    }
    product.owner = admin;
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
    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
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
      .where('product_id = :product_id', { product_id: id })
      .execute();
    if (updatedResult.affected === 0) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }
  async deleteProductById(id: string): Promise<void> {
    const deletedProduct = await this.productRepository.delete({
      product_id: id,
    });
    if (deletedProduct.affected === 0) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }
}
