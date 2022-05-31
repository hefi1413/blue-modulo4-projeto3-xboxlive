import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  create(dto: CreateUserDto) {

    if( dto.password != dto.confirmPassword ) {
      throw new BadRequestException('Senha não confirmada!');
    }

    dto.password =bcrypt.hashSync(dto.password, saltRounds );

    delete dto.confirmPassword;

    return this.prisma.users.create( { data: dto });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
