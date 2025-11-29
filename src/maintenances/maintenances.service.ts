import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Maintenance } from './entities/maintenance.entity';
import { v4 as uuid } from 'uuid';
import { validate as IsValidUUID } from 'uuid';
import { Repository } from 'typeorm';
import { VehicleService } from 'src/vehicles/vehicles.service';
import { CreateMaintenanceDTO } from './dto/create-maintenance.dto';
import { UpdateMaintenance } from './dto/update-maintenance.dto';

@Injectable()
export class MaintenancesService {
    constructor(
        @InjectRepository(Maintenance)
        private readonly maintenancesRepository: Repository<Maintenance>,
        private readonly vehicleService: VehicleService
    ) { }

    async getMaintenances(): Promise<Maintenance[]> {
        return await this.maintenancesRepository.find({
            relations: ['vehicle'],
        });
    }

    async getMaintenanceById(id: string): Promise<Maintenance> {
        if (!IsValidUUID(id)) {
            throw new BadRequestException('ID tem que ser um UUID');
        }
        const foundMaintenance = await this.maintenancesRepository.findOne({ where: { id } });
        if (!foundMaintenance) {
            throw new NotFoundException('Manutenção não encontrada');
        }
        return foundMaintenance;
    }

    async getMaintenanceByVehicleId(vehicleId: string): Promise<Maintenance[]> {
        const vehicle_id = vehicleId
        if (!IsValidUUID(vehicleId)) {
            throw new BadRequestException('ID tem que ser um UUID');
        }
        const foundMaintenance = await this.maintenancesRepository.find({ where: { vehicle_id } });
        if (!foundMaintenance) {
            throw new NotFoundException('Manutenção não encontrada');
        }
        return foundMaintenance;
    }

    async createMaintenance(vehicle_id: string, createMaintenance: CreateMaintenanceDTO): Promise<string> {
        try {
            if (!IsValidUUID(vehicle_id)) {
                throw new BadRequestException('ID tem que ser um UUID');
            }
            const foundVehicle = await this.vehicleService.getVehicleById(vehicle_id);
            if (!foundVehicle) {
                throw new NotFoundException('Veículo não encontrado');
            }
            const newMaintenance = new Maintenance();
            newMaintenance.id = uuid();
            newMaintenance.vehicle_id = vehicle_id
            newMaintenance.service = createMaintenance.service;
            newMaintenance.cost = createMaintenance.cost;
            newMaintenance.km = createMaintenance.km;
            newMaintenance.maintenance_date = createMaintenance.maintenance_date;
            newMaintenance.description = createMaintenance.description;
            await this.maintenancesRepository.save(newMaintenance);
            return 'Manutenção criada com sucesso';
        } catch (error) {
            throw new BadRequestException(`Ocorreu um erro ao cadastrar a manutenção: ${error.message}`);
        }
    }

    async updateMaintenance(id: string, newMaintenance: UpdateMaintenance): Promise<string> {
        try {
            if (!IsValidUUID(id)) {
                throw new BadRequestException('ID tem que ser um UUID');
            }

            const foundMaintenance = await this.maintenancesRepository.findOne({ where: { id } });

            if (!foundMaintenance) {
                throw new NotFoundException('Manutenção não encontrada');
            }

            await this.maintenancesRepository.update(id, newMaintenance);
            Object.assign(foundMaintenance, newMaintenance);
            return 'Manutenção atualizada com sucesso';
        } catch (error) {
            throw new BadRequestException(`Erro inesperado: ${error.message}`);
        }
    }
    async deleteMaintenance(id: string): Promise<string> {
        const foundMaintenance = await this.maintenancesRepository.findOne({ where: { id } });
        if (!IsValidUUID(id)) {
            throw new BadRequestException('ID tem que ser um UUID');
        }
        if (!foundMaintenance) {
            throw new NotFoundException('Manutenção não encontrada');
        }
        await this.maintenancesRepository.delete(id);
        return `Manutenção deletada com sucesso`;
    }
}
