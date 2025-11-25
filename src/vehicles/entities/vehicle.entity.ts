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

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  make: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  model: string;

  @IsString()
  @Column({ unique: true })
  @MinLength(7)
  @MaxLength(7)
  @IsOptional()
  license_plate: string;

  @Column()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  color: string;

  @Column()
  @IsString()
  @IsOptional()
  model_year: string;

  @OneToMany(() => Maintenance, maintenance => maintenance.vehicle)
  maintenances: Maintenance[];
}
