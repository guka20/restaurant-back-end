import { UserEntity } from 'src/auth/UserEntity/user.entity';
import { CartEntity } from 'src/cart/entity/cart.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
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

  @ManyToOne(() => UserEntity, (user) => user.products)
  @JoinColumn({ name: 'owner' })
  owner: UserEntity;

  @OneToMany(() => CartEntity, (cart) => cart.product)
  carts: CartEntity[];
}
