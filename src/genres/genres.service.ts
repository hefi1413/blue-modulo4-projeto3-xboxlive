import { Injectable, NotFoundException } from '@nestjs/common';
import { Genres } from './entities/genres.entity';
import { CreateGenresDto } from './dto/CreateGenres.dto';
import { UpdateGenresDto } from './dto/UpdateGenres.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenresService {
    constructor(private prisma :PrismaService ) {}

    findAll() {
        return this.prisma.genres.findMany();
    }
    
    async findById(_id: number) {
        const record =await this.prisma.genres.findUnique({ where: { id: _id, } });

        if (!record) {
            throw new NotFoundException(`Registro ID:${_id} não localizado.`)
        };
        return record;                    
    }

    create(dto: CreateGenresDto) {
        const _genres: Genres = { ...dto };
        return this.prisma.genres.create( { data: _genres });
    }

    async update(_id: number, dto: UpdateGenresDto) {
        const data: Partial<Genres> = { ...dto };

        const record =await this.prisma.genres.findUnique({ where: { id: _id, } });

        if (!record) {
            throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
        };

        return this.prisma.genres.update({
            where: { id: _id },
            data,
        });    
    }

    async delete(_id: number,) {
        const record =await this.prisma.genres.findUnique({ where: { id: _id, } });

        if (!record) {
            throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
        };

        return this.prisma.genres.delete({
            where: { id: _id },
        });    
    }
    
}
