import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity('products')
export class Product extends BaseModel {

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}