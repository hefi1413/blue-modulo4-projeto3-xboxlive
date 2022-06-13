import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma, Profiles  } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma :PrismaService ) {}

  getHomepage(idprofile: number,) {
    return this.prisma.profiles.findMany({
        where: { id: idprofile },
        include: {
            games: {
              include: {
                genres: true
              }
            },
        }
    })
  }

  getAppStatus(baseUrl: string) {
    return {
      status: 'Server is running!',
      docs: baseUrl + '/api',
    };
  }  
}

