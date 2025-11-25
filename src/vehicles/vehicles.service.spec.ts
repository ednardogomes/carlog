import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './vehicles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicles.dto';

const MOCK_VEHICLE_ID = 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6';
const MOCK_VEHICLE: Vehicle = {
    id: MOCK_VEHICLE_ID,
    make: 'Honda',
    model: 'Civic',
    color: 'Prata',
    model_year: '2023'
} as Vehicle;

const mockVehicleRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(entity => entity),
    delete: jest.fn(),
    update: jest.fn(),
};

jest.mock('uuid', () => ({
    v4: jest.fn(() => MOCK_VEHICLE_ID),
    validate: jest.fn(id => id === MOCK_VEHICLE_ID || id.length === 36),
}));
import { v4 as uuid, validate as isValidUUID } from 'uuid';

describe('VehicleService', () => {
    let service: VehicleService;
    let repository: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VehicleService,
                {
                    provide: getRepositoryToken(Vehicle),
                    useValue: mockVehicleRepository,
                },
            ],
        }).compile();

        service = module.get<VehicleService>(VehicleService);
        repository = module.get(getRepositoryToken(Vehicle));

        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createVehicle', () => {
        const createDto: CreateVehicleDto = {
            make: 'Honda', model: 'Civic', color: 'Prata', model_year: '2023'
        } as CreateVehicleDto;

        it('should call save with the new vehicle data and return success message', async () => {
            (uuid as jest.Mock).mockReturnValue(MOCK_VEHICLE_ID);

            const result = await service.createVehicle(createDto);

            expect(repository.save).toHaveBeenCalledTimes(1);

            expect(repository.save).toHaveBeenCalledWith({
                id: MOCK_VEHICLE_ID,
                ...createDto,
            });
            expect(result).toBe('Veículo cadastrado com sucesso');
        });

        it('should throw BadRequestException on database error', async () => {
            repository.save.mockRejectedValue(new Error('DB Error'));

            await expect(service.createVehicle(createDto)).rejects.toThrow(BadRequestException);
        });
    });

    describe('getVehicles', () => {
        it('should call repository.find and return an array of vehicles', async () => {
            repository.find.mockResolvedValue([MOCK_VEHICLE]);

            const result = await service.getVehicles();

            expect(repository.find).toHaveBeenCalledTimes(1);
            expect(result).toEqual([MOCK_VEHICLE]);
        });
    });

    describe('getVehicleById', () => {

        it('should return a vehicle if ID is valid and vehicle is found', async () => {
            repository.findOne.mockResolvedValue(MOCK_VEHICLE);
            (isValidUUID as jest.Mock).mockReturnValue(true);

            const result = await service.getVehicleById(MOCK_VEHICLE_ID);

            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: MOCK_VEHICLE_ID } });
            expect(result).toEqual(MOCK_VEHICLE);
        });

        it('should throw BadRequestException if ID is invalid', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(false);

            await expect(service.getVehicleById('invalid-id')).rejects.toThrow(BadRequestException);
            await expect(service.getVehicleById('invalid-id')).rejects.toThrow('Insira um ID válido');
            expect(repository.findOne).not.toHaveBeenCalled();
        });

        it('should throw NotFoundException if vehicle is not found', async () => {
            repository.findOne.mockResolvedValue(null);
            (isValidUUID as jest.Mock).mockReturnValue(true);

            await expect(service.getVehicleById(MOCK_VEHICLE_ID)).rejects.toThrow(NotFoundException);
            await expect(service.getVehicleById(MOCK_VEHICLE_ID)).rejects.toThrow('Veículo não encontrado.!');
        });
    });

});