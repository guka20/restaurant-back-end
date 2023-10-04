import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from '../dto/ProductDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../ProductEntity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  async createNewProduct(createProductDto: CreateProductDto): Promise<void> {
    const product = this.productRepository.create(createProductDto);
    this.productRepository.save(product);
  }
  async getAllProducts(): Promise<ProductDto[]> {
    const products = this.productRepository.find();
    return products;
  }
  async getProductById(id: string): Promise<ProductDto> {
    const product = await this.productRepository.findOneBy({ id });
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