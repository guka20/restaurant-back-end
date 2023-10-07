import { UserEntity } from 'src/auth/UserEntity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}
