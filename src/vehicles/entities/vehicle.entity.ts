import { Maintenance } from '../../maintenances/entities/maintenance.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column({ unique: true })
  license_plate: string;

  @Column()
  color: string;

  @Column()
  model_year: string;

  @OneToMany(() => Maintenance, maintenance => maintenance.vehicle)
  maintenances: Maintenance[];
}
