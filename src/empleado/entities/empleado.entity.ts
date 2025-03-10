import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { HorasTrabajo } from '../../horas_trabajo/entities/horas_trabajo.entity';

@Entity()
export class Empleado {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => HorasTrabajo, (horasTrabajo) => horasTrabajo.empleado)
    horasTrabajo: HorasTrabajo[];
}
