// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HorasTrabajoService } from './horas_trabajo.service';
import { CreateHorasTrabajoDto } from './dto/create-horas_trabajo.dto';

@Controller('horas-trabajo')
export class HorasTrabajoController {
    constructor(private readonly horasTrabajoService: HorasTrabajoService) {}

    @Post()
    create(@Body() createHorasTrabajoDto: CreateHorasTrabajoDto) {
        return this.horasTrabajoService.create(createHorasTrabajoDto);
    }

    @Get()
    findAll() {
        return this.horasTrabajoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const idNumber: number = parseInt(id, 10);
        if (Number.isNaN(idNumber)) {
            return { message: 'Identificador NO valido' };
        }

        const horasTrabajo = await this.horasTrabajoService.findOne(idNumber);

        if (!horasTrabajo) {
            return { message: 'Registro no encontrado' };
        }

        return horasTrabajo;
    }

    @Get('empleado/:id')
    async findByEmpleado(@Param('id') id: string) {
        const idNumber: number = parseInt(id, 10);
        if (Number.isNaN(idNumber)) {
            return {
                message: `Identificador de empleado ${id} NO valido`,
            };
        }

        const horasTrabajo =
            await this.horasTrabajoService.findByEmpleado(idNumber);

        if (horasTrabajo.length === 0) {
            return { message: 'Empleado sin registros de horas trabajadas' };
        }

        return horasTrabajo;
    }

    @Get('payroll/:id/:fecha1/:fecha2/:tarifa')
    async getPayroll(
        @Param('id') id: string,
        @Param('fecha1') fecha1: string,
        @Param('fecha2') fecha2: string,
        @Param('tarifa') tarifa: string,
    ) {
        const idNumber: number = parseInt(id, 10);
        const tarifaHoraria: number = parseInt(tarifa, 10);

        // validaciones básicas
        if (Number.isNaN(idNumber)) {
            return {
                message: `Identificador de empleado: ${id} NO valido`,
            };
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha1)) {
            return {
                message: 'Fecha 1 NO valida. Formato requerido: aaaa-mm-dd',
            };
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha2)) {
            return {
                message: 'Fecha 2 NO valida. Formato requerido: aaaa-mm-dd',
            };
        }

        if (new Date(fecha1) > new Date(fecha2)) {
            return { message: 'Fecha 1 NO puede ser mayor que Fecha 2' };
        }

        if (isNaN(tarifaHoraria)) {
            return { message: 'Tarifa horaria NO valida' };
        }

        try {
            // se calcula el payroll
            const horasTrabajo =
                await this.horasTrabajoService.findByEmpleadoAndFechas(
                    idNumber,
                    fecha1,
                    fecha2,
                );

            const milisegundosTrabajados: number = horasTrabajo.reduce(
                (acc, curr) => {
                    const horaEntrada: Date = new Date(
                        `2025-01-01T${curr.horaEntrada}`,
                    );
                    const horaSalida: Date = new Date(
                        `2025-01-01T${curr.horaSalida}`,
                    );

                    return (
                        acc +
                        (new Date(horaSalida).getTime() -
                            new Date(horaEntrada).getTime())
                    );
                },
                0,
            );

            // hay 3600000 milisegundos en una hora
            const horasTrabajadas: number = milisegundosTrabajados / 3600000;
            const diasTrabajados: number = horasTrabajo.length;
            const horasExtra: number =
                horasTrabajadas - 8 * diasTrabajados > 0
                    ? horasTrabajadas - 8 * diasTrabajados
                    : 0;
            const horasNormales: number = horasTrabajadas - horasExtra;
            const payroll: number =
                +tarifaHoraria * (horasNormales + horasExtra * 1.5);

            return {
                diasTrabajados,
                horasTrabajadas,
                horasNormales,
                horasExtra,
                tarifaHoraria,
                payroll: parseFloat(payroll.toFixed(2)),
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
                return { message: error.message };
            }
            return { message: 'Error al obtener la nómina' };
        }
    }
}
