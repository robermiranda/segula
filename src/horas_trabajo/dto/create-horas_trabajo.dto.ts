import { IsString, IsNotEmpty, IsNumber, Min, Matches } from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
    description: `DTO para la creación de una jornada
    laboral para un día en específico de un empleado`,
})
export class CreateHorasTrabajoDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @ApiProperty({
        description: 'ID del empleado',
        example: 2,
        required: true,
        type: Number,
        minimum: 1,
    })
    readonly empleadoId: number;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    @ApiProperty({
        description: `Fecha en formato YYYY-MM-DD.
        Es la fecha en la que el empleado se presentó
        a trabajar.`,
        example: '2025-02-15',
        required: true,
        type: String,
    })
    readonly fecha: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[0-9]{2}:[0-9]{2}$/)
    @ApiProperty({
        description: `Hora en formato HH:MM.
        Es la hora de entrada`,
        example: '08:00',
        required: true,
        type: String,
    })
    readonly horaEntrada: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[0-9]{2}:[0-9]{2}$/)
    @ApiProperty({
        description: `Hora en formato HH:MM.
        Es la hora de salida`,
        example: '17:00',
        required: true,
        type: String,
    })
    readonly horaSalida: string;
}
