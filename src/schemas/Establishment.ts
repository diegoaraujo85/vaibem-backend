import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('establishments')
export class Establishment {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
