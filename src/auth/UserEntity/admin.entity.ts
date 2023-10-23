import { ProductEntity } from 'src/product/ProductEntity/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('admin')
export class AdminEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ProductEntity, (product) => product.owner)
  products: ProductEntity[];

  @Column({ default: 'ADMIN' })
  role: string;
}
