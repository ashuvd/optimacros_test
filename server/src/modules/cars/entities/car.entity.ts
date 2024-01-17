import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('cars')
export class Car {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  brand: string;

  @Column()
  name: string;

  @Column()
  productionYear: number;

  @Column()
  price: number;
}
