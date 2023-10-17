import { UserEntity } from 'src/auth/UserEntity/user.entity';
import { CartItemEntity } from 'src/cart-item/entity/cartitem.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  cart_id: string;

  @OneToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CartItemEntity, (cartitem) => cartitem.cart)
  @JoinColumn({ name: 'cart_items' })
  cartItems: CartItemEntity[];
}
