import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Users } from '@prisma/client';

const saltRounds =10;

@Injectable()
export class UsersService {
  constructor(private prisma :PrismaService ) {}

  findAll() {
    return this.prisma.users.findMany({
                        include: {
                          profiles: {
                            orderBy: {
                              title: 'asc',
                            },
                            select: {
                              title: true,
                            },
                          },
                        }, 
                  })
  }

  async findOne(_id: number) {
    const record =await this.prisma.users.findUnique({ where: { id: _id, } });

    if (!record) {
        throw new NotFoundException(`Registro ID:${_id} não localizado.`)
    };
    return record;
  }

  create(dto: CreateUserDto) {

    if( dto.password != dto.confirmPassword ) {
      throw new BadRequestException('Senha não confirmada!');
    }

    dto.password =bcrypt.hashSync(dto.password, saltRounds );

    delete dto.confirmPassword;

    return this.prisma.users.create( { data: dto });
  }

  async update(_id: number, dto: UpdateUserDto) {
    const _data: Partial<Users> = { ...dto };

    const record =await this.prisma.users.findUnique({ where: { id: _id, } });

    if (!record) {
        throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
    };

    return this.prisma.users.update({
        where: { id: _id },
        data : _data,
    });
  }

  async delete(_id: number) {
    const record =await this.prisma.users.findUnique({ where: { id: _id, } });

    if (!record) {
        throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
    };

    return this.prisma.users.delete({
        where: { id: _id },
    });   
  }
}
