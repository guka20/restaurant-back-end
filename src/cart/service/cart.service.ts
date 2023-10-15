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
  async createCart(
    createCartDto: CreateCartDto,
    ownerId: string,
  ): Promise<CartDto> {
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
    const data = await this.cartRepository.save(newCart);
    return data;
  }

  async changeQuantity(cart_id: string, quantity: number) {
    const updatedCart = await this.cartRepository
      .createQueryBuilder()
      .update(CartEntity)
      .set({
        quantity,
      })
      .where('cart_item_id=:cart_item_id', { cart_item_id: cart_id })
      .execute();
    if (updatedCart.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }
  async GetCarts(owner_id: string): Promise<CartDto[]> {
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
