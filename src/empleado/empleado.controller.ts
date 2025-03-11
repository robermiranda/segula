// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { IdGuard } from '../guards/id.guard';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('empleado')
export class EmpleadoController {
    constructor(private readonly empleadoService: EmpleadoService) {}

    @Post()
    @ApiOperation({
        summary: 'Crea un empleado nuevo',
        description: `Crea el registro en base de datos para un empleado nuevo`,
    })
    @ApiResponse({
        status: 201,
        description: 'Empleado creado',
        example: {
            id: 1,
            nombre: 'Juan Pérez',
        },
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Identificador NO válido',
        example: {
            message: [
                'nombre must be shorter than or equal to 40 characters',
                'nombre must be a string',
                'nombre should not be empty',
            ],
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST,
        },
    })
    @ApiBody({
        description: `En el Body de la petición hay que agregar
        el nombre del empleado en formato json`,
        type: CreateEmpleadoDto,
        examples: {
            'Juan Pérez': {
                value: {
                    nombre: 'Juan Pérez',
                },
            },
            'Mariana Ramirez': {
                value: {
                    nombre: 'Mariana Ramirez',
                },
            },
        },
    })
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
        status: HttpStatus.OK,
        description: 'Lista de empleados',
    })
    findAll() {
        return this.empleadoService.findAll();
    }

    @Get(':id')
    @UseGuards(IdGuard)
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
        status: HttpStatus.OK,
        description: 'id y nombre del empleado',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Identificador NO válido',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Empleado NO encontrado',
    })
    async findOne(@Param('id') id: string) {
        const empleado = await this.empleadoService.findOne(parseInt(id, 10));
        if (!empleado) {
            throw new HttpException(
                'Empleado NO encontrado',
                HttpStatus.BAD_REQUEST,
            );
        }

        return empleado;
    }

    @Delete(':id')
    @UseGuards(IdGuard)
    @ApiOperation({
        summary: 'Elimina el registro de un empleado',
        description: `Se elimina el registro de un empleado
        con el id especificado. Si el empleado no existe, se
        regresa un mensaje indicando que no se encontró el empleado.
        Al eliminar un empleado también se eliminan los registros
        de las horas laboradas por el empleado. La eliminación de
        los registros de horas laboradas se realiza en cascada
        por la base de datos`,
    })
    @ApiParam({
        name: 'id',
        description: `Identificador del empleado que se desea eliminar`,
        required: true,
        type: Number,
        example: 17,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Empleado con id 5 eliminado',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Identificador NO válido',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Empleado NO encontrado',
    })
    async remove(@Param('id') id: string) {
        const deleteResult = await this.empleadoService.remove(
            parseInt(id, 10),
        );

        if (deleteResult.affected) {
            return {
                message: `Empleado con id ${id} eliminado`,
            };
        }

        throw new HttpException(
            'Empleado NO encontrado',
            HttpStatus.BAD_REQUEST,
        );
    }
}
