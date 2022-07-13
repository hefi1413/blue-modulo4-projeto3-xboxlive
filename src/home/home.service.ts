import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class HomeService {
    constructor(private prisma :PrismaService ) {}

    async getGamesByGenre(idGenre: string) {
        const record =await this.prisma.genres.findMany({ 
            where: { 
                id: idGenre,
            },
            include: {
                games : true
            }
        });

        if (!record) {
            throw new NotFoundException(`Gênero de ID:${idGenre} não localizado.`)
        };
        return record;                    
    }
}
