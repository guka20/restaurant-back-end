import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CartEntity } from '../entity/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/ProductEntity/product.entity';
import { UserEntity } from 'src/auth/UserEntity/user.entity';
import { CartDto, CreateCartDto } from '../dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}
  async createCart(createCartDto: CreateCartDto, ownerId: string) {
    const product = await this.productRepository.findOneBy({
      product_id: createCartDto.productId,
    });

    const user = await this.userRepository.findOneBy({
      id: ownerId,
    });

    if (!user || !product)
      throw new NotFoundException('Wrong token or product id');
    const newCart = this.cartRepository.create();
    newCart.cartowner = user;
    newCart.product = product;
    await this.cartRepository.save(newCart);
  }

  async changeQuantity(product_id: string) {
    console.log(product_id);
  }
  async GetCarts(owner_id: string): Promise<CartDto[]> {
    console.log(owner_id);
    const user = await this.userRepository.findOne({ where: { id: owner_id } });

    const carts = await this.cartRepository.find({
      where: {
        cartowner: {
          id: owner_id,
        },
      },
      relations: ['cartowner', 'product'],
    });

    return carts;
  }
}
