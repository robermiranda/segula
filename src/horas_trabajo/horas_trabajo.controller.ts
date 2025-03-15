// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param, UseGuards, HttpStatus } from '@nestjs/common';
import { HorasTrabajoService } from './horas_trabajo.service';
import { CreateHorasTrabajoDto } from './dto/create-horas_trabajo.dto';
import { IdGuard } from '../guards/id.guard';
import { PayrollGuard } from '../guards/payroll.guard';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ParametrosService } from 'src/parametros/parametros.service';

@Controller('horas-trabajo')
export class HorasTrabajoController {
    constructor(
        private readonly horasTrabajoService: HorasTrabajoService,
        private readonly parametrosService: ParametrosService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Crea un registro de horas de trabajo',
        description: `Crea un nuevo registro de horas trabajadas para un empleado`,
    })
    @ApiResponse({
        status: 201,
        description: 'Registro de horas de trabajo creado',
        example: {
            id: 1,
            empleadoId: 1,
            fecha: '2025-01-01',
            horaEntrada: '08:00',
            horaSalida: '17:00',
        },
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Datos inválidos',
    })
    @ApiBody({
        description: 'Datos para crear un nuevo registro de horas trabajadas',
        type: CreateHorasTrabajoDto,
        examples: {
            'Juan Carlos': {
                value: {
                    empleadoId: 11,
                    fecha: '2025-02-06',
                    horaEntrada: '09:00',
                    horaSalida: '18:00',
                    nombre: 'Juan Carlos Zamora',
                },
            },
        },
    })
    create(@Body() createHorasTrabajoDto: CreateHorasTrabajoDto) {
        return this.horasTrabajoService.create(createHorasTrabajoDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Obtiene las horas de trabajo',
        description: `Obtiene la lista de todos los registros de horas trabajadas`,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Lista de registros de horas trabajadas',
        example: [
            {
                id: 1,
                fecha: '2025-02-01',
                horaEntrada: '08:00:00',
                horaSalida: '17:00:00',
                empleadoId: 1,
            },
            {
                id: 2,
                fecha: '2025-02-01',
                horaEntrada: '09:00:00',
                horaSalida: '17:00:00',
                empleadoId: 2,
            },
        ],
    })
    findAll() {
        return this.horasTrabajoService.findAll();
    }

    @Get(':id')
    @UseGuards(IdGuard)
    @ApiOperation({
        summary: 'Obtiene un registro de horas de trabajo',
        description: `Obtiene el registro de horas de trabajo con el
        ID proporcionado`,
    })
    @ApiParam({
        name: 'id',
        description: 'El identificador único del registro de horas de trabajo',
        required: true,
        type: Number,
        example: 1,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Registro de horas de trabajo encontrado',
        example: {
            id: 1,
            fecha: '2025-02-01T06:00:00.000Z',
            horaEntrada: '08:00:00',
            horaSalida: '17:00:00',
            empleadoId: 1,
        },
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Identificador NO válido',
    })
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
    @ApiOperation({
        summary: 'Obtiene los registros de horas de trabajo de un empleado',
        description: `Obtiene todos los registros de horas de trabajo
        para un empleado con el ID especificado`,
    })
    @ApiParam({
        name: 'id',
        description: 'El identificador único del empleado',
        required: true,
        type: Number,
        example: 1,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Registros de horas de trabajo encontrados',
        example: [
            {
                id: 2,
                fecha: '2025-02-01T06:00:00.000Z',
                horaEntrada: '09:00:00',
                horaSalida: '17:00:00',
                empleadoId: 2,
            },
            {
                id: 3,
                fecha: '2025-02-02T06:00:00.000Z',
                horaEntrada: '09:00:00',
                horaSalida: '17:00:00',
                empleadoId: 2,
            },
        ],
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Identificador NO válido',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Empleado sin registros',
    })
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
    @ApiOperation({
        summary: 'Calcula la nómina de un empleado',
        description: `Calcula la nómina de un empleado
        especificado por su ID
        en un rango de fechas específico
        y estableciendo el valor de la tarifa horaria`,
    })
    @ApiParam({
        name: 'id',
        description: 'El identificador único del empleado',
        required: true,
        type: Number,
        example: 1,
    })
    @ApiParam({
        name: 'fecha1',
        description: 'Fecha de inicio del rango (formato: YYYY-MM-DD)',
        required: true,
        type: String,
        example: '2025-01-01',
    })
    @ApiParam({
        name: 'fecha2',
        description: 'Fecha de fin del rango (formato: YYYY-MM-DD)',
        required: true,
        type: String,
        example: '2025-01-31',
    })
    @ApiParam({
        name: 'tarifa',
        description: 'Tarifa horaria del empleado',
        required: true,
        type: Number,
        example: 20,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Nómina calculada',
        example: {
            diasTrabajados: 20,
            horasTrabajadas: 160,
            horasNormales: 160,
            horasExtra: 0,
            tarifaHoraria: 20,
            payroll: 3200,
        },
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Datos inválidos',
    })
    async getPayroll(
        @Param('id') id: string,
        @Param('fecha1') fecha1: string,
        @Param('fecha2') fecha2: string,
        @Param('tarifa') tarifa: string,
    ) {
        const idNumber: number = parseInt(id, 10);
        const tarifaHoraria: number = parseInt(tarifa, 10);
        //const JORNADA_LABORAL: number = 8;
        const JORNADA_LABORAL: number =
            this.parametrosService.getJornadaLaboral();
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
