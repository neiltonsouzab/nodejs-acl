import { PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';

export class BaseModel {

  @PrimaryColumn()
  id: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}