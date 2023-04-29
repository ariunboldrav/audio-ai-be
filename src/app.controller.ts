import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('stats')
  async stats() {
    const stats = {
      isGood: true,
      otp: false,
      version: 0.1,
    };

    return stats;
  }
}
