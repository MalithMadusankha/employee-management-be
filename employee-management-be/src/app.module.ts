import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as cors from 'cors';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { CorsMiddleware } from './cors.middleware';

@Module({
  imports: [
    EmployeeModule,
    MongooseModule.forRoot('mongodb://localhost/empolyee_mgt_db'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
