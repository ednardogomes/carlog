import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicles.dto';
import { UpdateVehicleDto } from './dto/update-vehicles.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { validate as isValidUUID } from 'uuid';

// import { Queue } from 'bull';
// import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    // @InjectQueue('vehicle')
    // private readonly VehicleQueue: Queue,
  ) { }

  async createVehicle(createVehicleDto: CreateVehicleDto): Promise<string> {
    try {
      const newVehicleDb = new Vehicle();
      newVehicleDb.id = uuid();
      newVehicleDb.make = createVehicleDto.make;
      newVehicleDb.model = createVehicleDto.model;
      newVehicleDb.color = createVehicleDto.color;
      newVehicleDb.model_year = createVehicleDto.model_year;
      await this.vehicleRepository.save(newVehicleDb);
      // await this.VehicleQueue.add('process-Vehicle', newVehicleDb);
      return 'Veículo cadastrado com sucesso';
    } catch (error) {
      throw new BadRequestException(
        `Ocorreu um erro ao cadastrar a Veículo ${error.message}`,
      );
    }
  }

  async getVehicles(): Promise<Vehicle[]> {
    return await this.vehicleRepository.find();
  }

  async getVehicleById(id: string): Promise<Vehicle> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Insira um ID válido');
    }

    const foundVehicle = await this.vehicleRepository.findOne({
      where: { id },
    });


    if (!foundVehicle) {
      throw new NotFoundException('Veículo não encontrado.!');
    }

    return foundVehicle;
  }

  async updateVehicle(
    id: string,
    updateVehiclekDto: UpdateVehicleDto,
  ): Promise<string> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Insira um ID válido');
    }
    try {
      const foundVehicle = await this.vehicleRepository.findOne({
        where: { id },
      });

      if (!foundVehicle) {
        throw new NotFoundException('Veículo não encontrado.!');
      }

      await this.vehicleRepository.update(id, updateVehiclekDto);
      Object.assign(foundVehicle, updateVehiclekDto);
      return 'Veículo atualizada com sucesso';
    } catch (error) {
      throw new BadRequestException(`Erro inesperado ${error.message}`);
    }
  }

  async deleteVehicle(id: string): Promise<string> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Insira um ID válido');
    }

    const foundVehicle = await this.vehicleRepository.findOne({
      where: { id },
    });

    if (!foundVehicle) {
      throw new NotFoundException('Veículo não encontrado.!');
    }

    const result = await this.vehicleRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Vehicle not found');
    return 'Veículo deletado com sucesso';

  }
}
