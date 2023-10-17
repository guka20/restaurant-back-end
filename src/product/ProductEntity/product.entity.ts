import { AdminEntity } from 'src/auth/UserEntity/admin.entity';
import { UserEntity } from 'src/auth/UserEntity/user.entity';
import { CartItemEntity } from 'src/cart-item/entity/cartitem.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column()
  name: string;

  @Column()
  subtitle: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column()
  image: string;

  @ManyToOne(() => AdminEntity, (admin) => admin.products)
  @JoinColumn({ name: 'owner' })
  owner: AdminEntity;

  @OneToMany(() => CartItemEntity, (cartitem) => cartitem.product)
  cartitems: CartItemEntity[];
}
