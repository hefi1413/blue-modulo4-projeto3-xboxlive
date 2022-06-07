import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenresDto } from './dto/CreateGenres.dto';
import { UpdateGenresDto } from './dto/UpdateGenres.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Genres } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('genres')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @Get()
    findAll() {
        return this.genresService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Localizar um gênero pelo ID',
    })    
    findOne(@Param('id') id: string) {
      return this.genresService.findById(+id);
    }

    @Post()
    create(@Body() dto: CreateGenresDto) {
        return this.genresService.create(dto);
    }    

    @Patch(':id')
    @ApiOperation({
      summary: 'Editar um gênero pelo ID',
    })    
    update(@Param('id') id: string, @Body() dto: UpdateGenresDto): Promise<Genres> {
        return this.genresService.update( +id, dto);
    }

    @Delete(':id')
    @ApiOperation({
      summary: 'Deletar gênero pelo ID',
    })    
    delete(@Param('id') id: string,): Promise<Genres> {
        return this.genresService.delete( +id );
    }
}
