import { IsString, IsNotEmpty, IsNumber, Min, Matches } from 'class-validator';

export class CreateHorasTrabajoDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    readonly empleadoId: number;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    readonly fecha: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/)
    readonly horaEntrada: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/)
    readonly horaSalida: string;
}
