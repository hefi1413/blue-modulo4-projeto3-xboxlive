import { Injectable, NotFoundException } from '@nestjs/common';
import { Profiles } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { FavoriteProfileDto } from './dto/favorite-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma :PrismaService ) {}

  findAll() {
    return this.prisma.profiles.findMany({
                          include: {
                              games: {
                                select: {
                                  title: true,
                                  CoverImageUrl: true,
                                }
                              }
                          }})    
  }

  async findById(_id: number) {
    const record =await this.prisma.profiles.findUnique({ where: { id: _id, } });

    if (!record) {
        throw new NotFoundException(`Registro ID:${_id} não localizado.`)
    };
    return record;
  }

  create(dto: CreateProfileDto) {
    return this.prisma.profiles.create( { data: dto });
  }

  async update(_id: number, dto: UpdateProfileDto) {
    const _data: Partial<Profiles> = { ...dto };

    const record =await this.prisma.profiles.findUnique({ where: { id: _id, } });

    if (!record) {
        throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
    };

    return this.prisma.profiles.update({
        where: { id: _id },
        data : _data,
    });
  }

  async delete(_id: number) {
    const record =await this.prisma.profiles.findUnique({ 
                                where: { id: _id, },
                                include: {
                                  games: true,
                                }  
                              });

    if (!record) {
        throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
    };

    return this.prisma.profiles.delete({
        where: { id: _id },
    });    
  }

  async favorite( _id: number, dto: FavoriteProfileDto) {

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
