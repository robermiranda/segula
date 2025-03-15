/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { HorasTrabajoController } from './horas_trabajo.controller';
import { HorasTrabajoService } from './horas_trabajo.service';

describe('Test suites for Horas - Trabajo Controller', () => {
    let controller: HorasTrabajoController;
    let service: HorasTrabajoService;

    const horasTrabajo = [
        {
            id: 1,
            empleadoId: 1,
            fecha: '2025-02-10',
            hora_entrada: '08:12',
            hora_salida: '17:00',
        },
        {
            id: 2,
            empleadoId: 23,
            fecha: '2025-02-11',
            hora_entrada: '08:58',
            hora_salida: '18:00',
        },
    ];

    const horasTrabajoPorEmpleado = [
        {
            id: 1,
            fecha: '2025-02-01',
            horaEntrada: '08:00',
            horaSalida: '17:00',
            empleadoId: 1,
        },
        {
            id: 33,
            fecha: '2025-02-04',
            horaEntrada: '10:00:00',
            horaSalida: '16:40:00',
            empleadoId: 1,
        },
        {
            id: 37,
            fecha: '2025-02-05',
            horaEntrada: '09:00:00',
            horaSalida: '16:55:00',
            empleadoId: 1,
        },
        {
            id: 38,
            fecha: '2025-02-06',
            horaEntrada: '09:00:00',
            horaSalida: '18:00:00',
            empleadoId: 1,
        },
    ];

    const oneRegister = {
        id: 1,
        empleadoId: 23,
        fecha: '2025-02-11',
        hora_entrada: '08:58',
        hora_salida: '18:00',
    };

    const payroll = {
        diasTrabajados: 4,
        horasTrabajadas: 32.583333333333336,
        horasNormales: 32,
        horasExtra: 0.5833333333333357,
        tarifaHoraria: 100,
        payroll: 3287.5,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [HorasTrabajoController],
            providers: [
                HorasTrabajoService,
                {
                    provide: HorasTrabajoService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue(horasTrabajo),
                        findOne: jest.fn().mockImplementation((id: number) =>
                            Promise.resolve({
                                ...oneRegister,
                                id,
                            }),
                        ),
                        findByEmpleado: jest
                            .fn()
                            .mockImplementation((empleadoId: number) =>
                                Promise.resolve({
                                    ...oneRegister,
                                    empleadoId,
                                }),
                            ),
                        findByEmpleadoAndFechas: jest
                            .fn()
                            .mockImplementation(
                                (
                                    empleadoId: number,
                                    fecha1: string,
                                    fecha2: string,
                                ) => Promise.resolve(horasTrabajoPorEmpleado),
                            ),
                    },
                },
            ],
        }).compile();

        controller = module.get<HorasTrabajoController>(HorasTrabajoController);
        service = module.get<HorasTrabajoService>(HorasTrabajoService);
    });

    test('Controller and Service should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });

    test('Find all horas - trabajo', async () => {
        await expect(controller.findAll()).resolves.toEqual(horasTrabajo);
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(service.findAll).toHaveBeenCalled();
    });

    test('Find one', async () => {
        await expect(controller.findOne('1')).resolves.toEqual({
            ...oneRegister,
            id: 1,
        });
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(service.findOne).toHaveBeenCalled();
    });

    test('Find by empleado', async () => {
        await expect(controller.findByEmpleado('1')).resolves.toEqual({
            ...oneRegister,
            empleadoId: 1,
        });

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(service.findByEmpleado).toHaveBeenCalled();
    });

    test('Get payroll', async () => {
        await expect(
            controller.getPayroll('1', '2025-02-01', '2025-02-10', '100'),
        ).resolves.toEqual(payroll);
    });
});

// Example:
// https://github.com/nestjs/nest/blob/master/sample/05-sql-typeorm/src/users/users.controller.spec.ts
