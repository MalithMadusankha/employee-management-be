import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { tap } from 'rxjs/operators';

@Injectable()
export class CorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    if (request.method === 'OPTIONS') {
      const response = ctx.getResponse();
      const headers = {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': true,
      };

      response.writeHead(200, headers);
      response.end();
      return;
    }

    const config: AxiosRequestConfig = { headers: {} };
    config.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
    config.headers['Access-Control-Allow-Headers'] =
      'Content-Type, Authorization';
    config.headers['Access-Control-Allow-Credentials'] = true;

    return next.handle().pipe(
      tap(() => {
        // Do something after the request is completed
      }),
    );
  }
}
