import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma :PrismaService ) {}

  getAppStatus(baseUrl: string) {
    return {
      status: 'Server is running!',
      docs: baseUrl + '/api',
    };
  }  
}

