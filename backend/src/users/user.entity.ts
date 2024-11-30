import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('information')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;
}
