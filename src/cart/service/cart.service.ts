import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../entity/cart.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/UserEntity/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async GetCarts(owner_id: string) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder
      .leftJoinAndSelect('user.cart', 'cart')
      .leftJoinAndSelect('cart.cartItems', 'cartItem')
      .leftJoinAndSelect('cartItem.product', 'product');
    queryBuilder.where('user.id = :owner_id', { owner_id });

    queryBuilder.addSelect(
      'SUM(cartItem.quantity * product.price)',
      'totalPrice',
    );
    const result = await queryBuilder.getRawOne();
    const totalPrice = result ? result.totalPrice : 0;
    const user = await this.userRepository.findOne({
      where: {
        id: owner_id,
      },
      relations: ['cart', 'cart.cartItems', 'cart.cartItems.product'],
    });
    if (!user) {
      throw new HttpException(
        'Provided token is not correct',
        HttpStatus.NOT_FOUND,
      );
    }
    return { cart: user.cart, totalPrice };
  }
}
