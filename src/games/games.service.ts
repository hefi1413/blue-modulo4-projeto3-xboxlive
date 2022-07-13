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
                genres: {
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

    async findById(_id: string) {
        const record =await this.prisma.games.findUnique({ 
            where: { id: _id, },
            include: {
                genres: {
                  orderBy: {
                    name: 'asc',
                  },
                  select: {
                    id: true,
                    name: true,
                  },
                },
            }, 
        });

        if (!record) {
            throw new NotFoundException(`Registro ID:${_id} não localizado.`)
        };
        return record;                    
    }

    create(dto: CreateGamesDto) {
        const _data =  {
            title: dto.title,
            CoverImageUrl: dto.CoverImageUrl,
            Description: dto.Description,
            Year:dto.Year,
            ImdbScore:dto.ImdbScore,
            TrailerYouTubeUrl:dto.TrailerYouTubeUrl,
            GameplayYouTubeUrl:dto.GameplayYouTubeUrl,
        };

        // optional relation
        if (dto.genres) {
            _data["genres"] = {           
                connect: dto.genres 
            }
        };

        return this.prisma.games.create({ 
            data:_data,
            include: {
                genres: true,
            },
        }) 
    }

    async update(_id: string, dto: UpdateGamesDto) {
        const record =await this.prisma.games.findUnique({ where: { id: _id, } });

        if (!record) {
            throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
        };

        const _data =  {
            title: dto.title || record.title,
            CoverImageUrl: dto.CoverImageUrl || record.CoverImageUrl,
            Description: dto.Description || record.Description,
            Year: dto.Year || record.Year,
            ImdbScore: dto.ImdbScore || record.ImdbScore,
            TrailerYouTubeUrl: dto.TrailerYouTubeUrl || record.TrailerYouTubeUrl,
            GameplayYouTubeUrl: dto.GameplayYouTubeUrl || record.GameplayYouTubeUrl
        };

        // optional relation
        if (dto.genres) {
            _data["genres"] = {
                set: [],
                connect: dto.genres
            }
        };

        return this.prisma.games.update({
            where: { id: _id },
            data : _data,
        });
    }

    async delete(_id: string,) {
        const record =await this.prisma.games.findUnique({ where: { id: _id, } });

        if (!record) {
            throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
        };

        return this.prisma.games.delete({
            where: { id: _id },
        });    
    }

    async getGameByGenre(idGenre: string) {
        const record =await this.prisma.games.findMany({ 
        });

        if (!record) {
            throw new NotFoundException(`Registro ID:${idGenre} não localizado.`)
        };
        return record;                    
    }

}
