import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  @Get()
  getRoot() {
    return { message: 'Backend is running!' };
  }
}
