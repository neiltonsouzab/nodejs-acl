import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity('permissions')
export class Permission extends BaseModel {

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}