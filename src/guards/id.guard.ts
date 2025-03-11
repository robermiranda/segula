import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class IdGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const idNumber: number = parseInt(request.params.id, 10);

        if (Number.isNaN(idNumber)) {
            throw new HttpException(
                `Identificador ${request.params.id} NO valido`,
                400,
            );
        }

        return true;
    }
}
