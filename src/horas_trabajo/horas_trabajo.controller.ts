// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
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
    findOne(@Param('id') id: string) {
        return this.horasTrabajoService.findOne(+id);
    }

    @Get('empleado/:id')
    findByEmpleado(@Param('id') id: string) {
        return this.horasTrabajoService.findByEmpleado(+id);
    }

    @Get('empleado/:id/:fecha1/:fecha2/:tarifa')
    async findPayroll(
        @Param('id') id: string,
        @Param('fecha1') fecha1: string,
        @Param('fecha2') fecha2: string,
        @Param('tarifa') tarifaHoraria: string,
    ) {
        const horasTrabajo =
            await this.horasTrabajoService.findByEmpleadoAndFechas(
                +id,
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
            payroll,
        };
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.horasTrabajoService.remove(+id);
    }
}
