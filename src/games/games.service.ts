import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGamesDto } from './dto/CreateGames.dto';
import { UpdateGamesDto } from './dto/UpdateGames.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Games } from './entities/games.entity';

@Injectable()
export class GamesService {
    constructor(private prisma :PrismaService ) {}

    findAll() {
        return this.prisma.games.findMany({
            include: {
                genders: {
                  orderBy: {
                    name: 'asc',
                  },
                  select: {
                    id: true,
                    name: true,
                  },
                },
              }, 
            }
        );
    }

    async findById(_id: number) {
        const record =await this.prisma.games.findUnique({ where: { id: _id, } });

        if (!record) {
            throw new NotFoundException(`Registro ID:${_id} não localizado.`)
        };
        return record;                    
    }

    create(dto: CreateGamesDto) {
        const games: Games = { ...dto };

        const _data =  {
            title: dto.title,
            CoverImageUrl: dto.CoverImageUrl,
            Description: dto.Description,
            Year:dto.Year,
            ImdbScore:dto.ImdbScore,
            TrailerYouTubeUrl:dto.TrailerYouTubeUrl,
            GameplayYouTubeUrl:dto.GameplayYouTubeUrl,
            genders: {
                connect: dto.genders 
            },
        };

        console.log('data:', _data );

        return this.prisma.games.create({ 
            data:_data,
            include: {
                genders: true,
            },
        }) 
    }

    async update(_id: number, dto: UpdateGamesDto) {
        const _data: Partial<Games> = { ...dto };

        const record =await this.prisma.games.findUnique({ where: { id: _id, } });

        if (!record) {
            throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
        };

        return this.prisma.games.update({
            where: { id: _id },
            data : _data,
        });    
    }

    async delete(_id: number,) {
        const record =await this.prisma.games.findUnique({ where: { id: _id, } });

        if (!record) {
            throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
        };

        return this.prisma.games.delete({
            where: { id: _id },
        });    
    }
    
}
