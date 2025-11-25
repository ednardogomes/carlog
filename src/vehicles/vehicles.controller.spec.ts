import { Test, TestingModule } from "@nestjs/testing";
import { VehiclesController } from "./vehicles.controller"
import { VehicleService } from "./vehicles.service"
import { Vehicle } from "./entities/vehicle.entity";
import { CreateVehicleDto } from "./dto/create-vehicles.dto";
import { UpdateVehicleDto } from "./dto/update-vehicles.dto";

const mockVehicleService = {
    getVehicles: jest.fn(),
    getVehicleById: jest.fn(),
    createVehicle: jest.fn(),
    updateVehicle: jest.fn(),
    deleteVehicle: jest.fn(),
}

type mockVehicleService = typeof mockVehicleService

describe('VehiclesController', () => {
    let controller: VehiclesController;
    let service: mockVehicleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VehiclesController],
            providers: [
                {
                    provide: VehicleService,
                    useValue: mockVehicleService
                }
            ]
        }).compile()
        controller = module.get<VehiclesController>(VehiclesController);
        service = module.get<mockVehicleService>(VehicleService);

        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    })
    describe('getAllVehicles', () => {
        it('should call service.getVehicles and return an array of vehicles', async () => {
            const result: Vehicle[] = [{ id: '1', model: 'Fusca', color: 'branco', make: 'volks', model_year: '2025' } as Vehicle];
            service.getVehicles.mockResolvedValue(result);

            const vehicles = await controller.getAllVehicles();

            expect(service.getVehicles).toHaveBeenCalledTimes(1);
            expect(vehicles).toEqual(result);
        });
    });

    describe('createVehicle', () => {
        it('should call service.createVehicle with the DTO and return a success message', async () => {
            const createDto: CreateVehicleDto = { model: 'Kombi', color: 'Azul' } as CreateVehicleDto;
            const expectedMessage = 'Veículo criado com sucesso';
            service.createVehicle.mockResolvedValue(expectedMessage);

            const result = await controller.createVehicle(createDto);

            expect(service.createVehicle).toHaveBeenCalledWith(createDto);
            expect(result).toBe(expectedMessage);
        });
    });

    describe('getVehicleById', () => {
        it('should call service.getVehicleById with the correct ID', async () => {
            const vehicleId = '2';
            const result: Vehicle = { id: vehicleId, model: 'Corsa' } as Vehicle;
            service.getVehicleById.mockResolvedValue(result);

            await controller.getVehicleById(vehicleId);

            expect(service.getVehicleById).toHaveBeenCalledWith(vehicleId);
        });
    });

    describe('updateVehicle', () => {
        it('should call service.updateVehicle with ID and DTO', async () => {
            const vehicleId = '3';
            const updateDto: UpdateVehicleDto = { color: 'Preto' } as UpdateVehicleDto;
            service.updateVehicle.mockResolvedValue('Atualizado');

            await controller.updateVehicle(vehicleId, updateDto);

            expect(service.updateVehicle).toHaveBeenCalledWith(vehicleId, updateDto);
        });
    });

    describe('deleteVehicle', () => {
        it('should call service.deleteVehicle with the correct ID', async () => {
            const vehicleId = '4';
            service.deleteVehicle.mockResolvedValue('Deletado');

            await controller.deleteVehicle(vehicleId);

            expect(service.deleteVehicle).toHaveBeenCalledWith(vehicleId);
        });
    });
})