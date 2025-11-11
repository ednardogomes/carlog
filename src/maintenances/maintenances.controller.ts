import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MaintenancesService } from './maintenances.service';
import { Maintenance } from './entities/maintenance.entity';
import { CreateMaintenanceDTO } from './dto/create-maintenance.dto';
import { UpdateMaintenance } from './dto/update-maintenance.dto';

@Controller('maintenance')
export class MaintenancesController {
  constructor(private readonly MaintenancesService: MaintenancesService) { }

  @Get()
  async getAllMaintenances(): Promise<Maintenance[]> {
    return await this.MaintenancesService.getMaintenances();
  }

  @Get(':id')
  async getMaintenanceById(@Param('id') id: string): Promise<Maintenance> {
    return await this.MaintenancesService.getMaintenanceById(id);
  }

  @Get('/per-vehicle/:vehicle_id')
  async getMaintenanceByVehicleId(@Param('vehicle_id') vehicle_id: string): Promise<Maintenance[]> {
    return await this.MaintenancesService.getMaintenanceByVehicleId(vehicle_id);
  }

  @Post(':vehicle_id')
  async createMaintenance(
    @Param('vehicle_id') vehicle_id: string,
    @Body() CreateMaintenanceDTO: CreateMaintenanceDTO): Promise<string> {
    return await this.MaintenancesService.createMaintenance(vehicle_id, CreateMaintenanceDTO);
  }

  @Put(':id')
  async updateMaintenance(
    @Param('id') id: string,
    @Body() CreateMaintenanceDTO: UpdateMaintenance): Promise<string> {
    return await this.MaintenancesService.updateMaintenance(id, CreateMaintenanceDTO);
  }

  @Delete(':id')
  async deleteMaintenance(@Param('id') id: string): Promise<string> {
    return await this.MaintenancesService.deleteMaintenance(id);
  }
}