import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadoController } from './empleado.controller';
import { EmpleadoService } from './empleado.service';

describe('Test suites for Empleado Controller', () => {
    let controller: EmpleadoController;
    let service: EmpleadoService;

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
                        findOne: jest.fn().mockImplementation((id: string) =>
                            Promise.resolve({
                                nombre: 'Roberto Miranda Morales',
                                id,
                            }),
                        ),
                    },
                },
            ],
        }).compile();

        controller = module.get<EmpleadoController>(EmpleadoController);
        service = module.get<EmpleadoService>(EmpleadoService);
    });

    test('Controller and Service should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });

    test('Find all empleados', async () => {
        await expect(controller.findAll()).resolves.toEqual(empleados);
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(service.findAll).toHaveBeenCalled();
    });

    test('should find a user with id = 1', async () => {
        await expect(controller.findOne('1')).resolves.toEqual({
            nombre: 'Roberto Miranda Morales',
            id: 1,
        });
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(service.findOne).toHaveBeenCalled();
    });
});

// Example:
// https://github.com/nestjs/nest/blob/master/sample/05-sql-typeorm/src/users/users.controller.spec.ts
