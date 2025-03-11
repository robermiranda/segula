// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { HorasTrabajoService } from './horas_trabajo.service';
import { CreateHorasTrabajoDto } from './dto/create-horas_trabajo.dto';
import { IdGuard } from '../guards/id.guard';
import { PayrollGuard } from 'src/guards/payroll.guard';

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
    @UseGuards(IdGuard)
    async findOne(@Param('id') id: string) {
        const horasTrabajo = await this.horasTrabajoService.findOne(
            parseInt(id, 10),
        );

        if (!horasTrabajo) {
            return { message: 'Registro no encontrado' };
        }

        return horasTrabajo;
    }

    @Get('empleado/:id')
    @UseGuards(IdGuard)
    async findByEmpleado(@Param('id') id: string) {
        const horasTrabajo = await this.horasTrabajoService.findByEmpleado(
            parseInt(id, 10),
        );

        if (horasTrabajo.length === 0) {
            return { message: 'Empleado sin registros de horas trabajadas' };
        }

        return horasTrabajo;
    }

    @Get('payroll/:id/:fecha1/:fecha2/:tarifa')
    @UseGuards(PayrollGuard)
    async getPayroll(
        @Param('id') id: string,
        @Param('fecha1') fecha1: string,
        @Param('fecha2') fecha2: string,
        @Param('tarifa') tarifa: string,
    ) {
        const idNumber: number = parseInt(id, 10);
        const tarifaHoraria: number = parseInt(tarifa, 10);
        const JORNADA_LABORAL: number = 8;
        const FACTOR_HORAS_EXTRA: number = 1.5;

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

            // hay 3,600,000 milisegundos en una hora
            const horasTrabajadas: number = milisegundosTrabajados / 3600000;
            const diasTrabajados: number = horasTrabajo.length;

            const horasExtra: number =
                horasTrabajadas - JORNADA_LABORAL * diasTrabajados > 0
                    ? horasTrabajadas - JORNADA_LABORAL * diasTrabajados
                    : 0;

            const horasNormales: number = horasTrabajadas - horasExtra;

            const payroll: number =
                tarifaHoraria *
                (horasNormales + horasExtra * FACTOR_HORAS_EXTRA);

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
