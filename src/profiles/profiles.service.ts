import { Injectable, NotFoundException } from '@nestjs/common';
import { Profiles } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
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
    //const profile: Profiles = { ...dto, createdAt: null, id: 0 };
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
    const record =await this.prisma.profiles.findUnique({ where: { id: _id, } });

    if (!record) {
        throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
    };

    return this.prisma.profiles.delete({
        where: { id: _id },
    });    
  }

  async favorite( _id: number, dto: Object[]) {

    return await this.prisma.profiles.update({
      where: { id: _id },
      data: {
        games: {
          connect: dto,
        }
      }
    })
  }
}
