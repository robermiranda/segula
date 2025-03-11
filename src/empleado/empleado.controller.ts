// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { IdGuard } from '../guards/id.guard';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('empleado')
export class EmpleadoController {
    constructor(private readonly empleadoService: EmpleadoService) {}

    @Post()
    create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
        return this.empleadoService.create(createEmpleadoDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Obtiene la lista de empleados',
        description: `Obtiene una lista de todos los empleados
            registrados en la base de datos`,
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de empleados',
    })
    findAll() {
        return this.empleadoService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Obtiene el registro de un empleado',
        description: `Obtiene el registro del empleado con el id
        proporcionado`,
    })
    @ApiParam({
        name: 'id',
        description: `Identificador del empleado con el cual
        se realizara la búsqueda en la base de datos`,
        required: true,
        type: Number,
        example: 18,
    })
    @ApiResponse({
        status: 200,
        description: 'id y nombre del empleado',
    })
    @ApiResponse({
        status: 400,
        description: 'Identificador NO válido',
    })
    @UseGuards(IdGuard)
    async findOne(@Param('id') id: string) {
        const empleado = await this.empleadoService.findOne(parseInt(id, 10));
        if (!empleado) {
            return { message: 'Empleado no encontrado' };
        }

        return empleado;
    }

    @Delete(':id')
    @UseGuards(IdGuard)
    async remove(@Param('id') id: string) {
        const deleteResult = await this.empleadoService.remove(
            parseInt(id, 10),
        );

        if (deleteResult.affected) {
            return {
                message: `Registros eliminados: ${deleteResult.affected}`,
            };
        }

        return { message: 'Empleado no encontrado' };
    }
}
