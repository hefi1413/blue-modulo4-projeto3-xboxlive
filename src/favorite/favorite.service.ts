import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoriteDto } from './dto/favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private prisma :PrismaService ) {}


  async favorite( _id: number, dto: FavoriteDto) {
    return await this.prisma.profiles.update({
      where: { id: _id },
      data: {
        games: {
          set: [],
          connect: dto.games,
        }
      }
    })
  }
}
