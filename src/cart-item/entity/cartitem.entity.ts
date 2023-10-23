import { Min } from 'class-validator';
import { CartEntity } from 'src/cart/entity/cart.entity';
import { ProductEntity } from 'src/product/ProductEntity/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cart_item')
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  cart_item_id: string;

  @ManyToOne(() => CartEntity, (cart) => cart.cartItems)
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product' })
  product: ProductEntity;

  @Column({ default: 1 })
  @Min(1)
  quantity: number;
}
