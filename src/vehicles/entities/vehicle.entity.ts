<<<<<<< HEAD
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
=======
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Maintenance } from '../../maintenances/entities/maintenance.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
>>>>>>> development

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @IsString()
  @Column({ unique: true })
  @MinLength(7)
  @MaxLength(7)
  @IsOptional()
  license_plate: string;

  @Column()
  color: string;

  @Column()
  model_year: string;

  @OneToMany(() => Maintenance, maintenance => maintenance.vehicle)
  maintenances: Maintenance[];
}
