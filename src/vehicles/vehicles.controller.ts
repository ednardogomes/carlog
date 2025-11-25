import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicles.dto';
import { UpdateVehicleDto } from './dto/update-vehicles.dto';
import { Vehicle } from './entities/vehicle.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('vehicle')
export class VehiclesController {
  constructor(private readonly VehicleService: VehicleService) { }

  @Get()
  async getAllVehicles(): Promise<Vehicle[]> {
    return await this.VehicleService.getVehicles();
  }

  @Post()
  async createVehicle(
    @Body() CreateVehicleDto: CreateVehicleDto,
  ): Promise<string> {
    return await this.VehicleService.createVehicle(CreateVehicleDto);
  }

  @Get('/:id')
  async getVehicleById(@Param('id') id: string): Promise<Vehicle> {
    return await this.VehicleService.getVehicleById(id);
  }

  @Put('/:id')
  async updateVehicle(
    @Param('id') id: string,
    @Body() UpdateVehicleDto: UpdateVehicleDto,
  ): Promise<string> {
    return await this.VehicleService.updateVehicle(id, UpdateVehicleDto);
  }

  @Delete('/:id')
  async deleteVehicle(@Param('id') id: string): Promise<string> {
    return await this.VehicleService.deleteVehicle(id);
  }
}
