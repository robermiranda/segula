import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class PayrollGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        // validaciones básicas

        const id: number = parseInt(request.params.id, 10);
        if (Number.isNaN(id)) {
            throw new HttpException(
                `Identificador ${request.params.id} NO valido`,
                400,
            );
        }

        const fecha1: string = request.params.fecha1;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha1)) {
            throw new HttpException(
                `Fecha 1 ${fecha1} NO tiene el formato requerido: aaaa-mm-dd`,
                400,
            );
        }

        const fecha2: string = request.params.fecha2;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha2)) {
            throw new HttpException(
                `Fecha 2 ${fecha2} NO tiene el formato requerido: aaaa-mm-dd`,
                400,
            );
        }

        if (new Date(fecha1) > new Date(fecha2)) {
            throw new HttpException(
                `Fecha 1 ${fecha1} NO puede ser mayor que Fecha 2 ${fecha2}`,
                400,
            );
        }

        const tarifa: number = parseInt(request.params.tarifa, 10);
        if (isNaN(tarifa)) {
            throw new HttpException(
                `tarifa horaria ${request.params.tarifa} NO valida`,
                400,
            );
        }

        return true;
    }
}
