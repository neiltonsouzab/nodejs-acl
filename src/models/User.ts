import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, UpdateDateColumn } from "typeorm";

import { BaseModel } from "./BaseModel";
import { Permission } from "./Permission";
import { Role } from "./Role";

@Entity('users')
export class User extends BaseModel {

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'users_permissions',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }]
  })
  permissions: Permission[];

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }]
  })
  roles: Role[];
}