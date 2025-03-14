import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadoController } from './empleado.controller';
import { EmpleadoService } from './empleado.service';

describe('Empleado Controller', () => {
    let controller: EmpleadoController;

    const empleados = [
        {
            id: 1,
            nombre: 'Roberto',
        },
        {
            id: 2,
            nombre: 'Avigail',
        },
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EmpleadoController],
            providers: [
                EmpleadoService,
                {
                    provide: EmpleadoService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue(empleados),
                    },
                },
            ],
        }).compile();

        controller = module.get<EmpleadoController>(EmpleadoController);
    });

    it('Should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('Finde all empleados', async () => {
        await expect(controller.findAll()).resolves.toEqual(empleados);
    });
});
