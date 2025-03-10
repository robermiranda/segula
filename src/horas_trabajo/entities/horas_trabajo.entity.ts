// eslint-disable-next-line prettier/prettier
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Empleado } from '../../empleado/entities/empleado.entity';

@Entity()
export class HorasTrabajo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha: string;

    @Column({
        name: 'hora_entrada',
    })
    horaEntrada: string;

    @Column({
        name: 'hora_salida',
    })
    horaSalida: string;

    @Column()
    empleadoId: number;

    @ManyToOne(() => Empleado, (empleado) => empleado.horasTrabajo)
    empleado: Empleado;
}
