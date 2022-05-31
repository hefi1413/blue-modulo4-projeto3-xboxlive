import { Injectable, NotFoundException } from '@nestjs/common';
import { Genders } from './entities/genders.entity';
import { CreateGendersDto } from './dto/CreateGenders.dto';
import { UpdateGendersDto } from './dto/UpdateGenders.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GendersService {
    constructor(private prisma :PrismaService ) {}

    findAll() {
        return this.prisma.genders.findMany();
    }
    
    async findById(_id: number) {
        const record =await this.prisma.genders.findUnique({ where: { id: _id, } });

        if (!record) {
            throw new NotFoundException(`Registro ID:${_id} não localizado.`)
        };
        return record;                    
    }

    create(dto: CreateGendersDto) {
        const _genders: Genders = { ...dto };
        return this.prisma.genders.create( { data: _genders });
    }

    async update(_id: number, dto: UpdateGendersDto) {
        const data: Partial<Genders> = { ...dto };

        const record =await this.prisma.games.findUnique({ where: { id: _id, } });

        if (!record) {
            throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
        };

        return this.prisma.genders.update({
            where: { id: _id },
            data,
        });    
    }

    async delete(_id: number,) {
        const record =await this.prisma.games.findUnique({ where: { id: _id, } });

        if (!record) {
            throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
        };

        return this.prisma.genders.delete({
            where: { id: _id },
        });    
    }
    
}
