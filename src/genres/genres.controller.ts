import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, UnauthorizedException } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenresDto } from './dto/CreateGenres.dto';
import { UpdateGenresDto } from './dto/UpdateGenres.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from '../auth/logged-user.decorator';
import { Users } from 'src/users/entities/user.entity';
import { Genres } from './entities/genres.entity';

@ApiTags('genres')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @Get()
    findAll(@LoggedUser() user: Users) {
      if( !user.isAdmin ) {
        throw new UnauthorizedException(`Usuário ${user.name} não esta cadastrado como administrador`)
      }
      return this.genresService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Localizar um gênero pelo ID',
    })    
    findOne(@Param('id') id: string, @LoggedUser() user: Users) {
      if( !user.isAdmin ) {
        throw new UnauthorizedException(`Usuário ${user.name} não esta cadastrado como administrador`)
      }
      return this.genresService.findById(id);
    }

    @Post()
    create(@Body() dto: CreateGenresDto, @LoggedUser() user: Users) {
      if( !user.isAdmin ) {
        throw new UnauthorizedException(`Usuário ${user.name} não esta cadastrado como administrador`)
      }
      return this.genresService.create(dto);
    }    

    @Patch(':id')
    @ApiOperation({
      summary: 'Editar um gênero pelo ID',
    })    
    update(@Param('id') id: string, @LoggedUser() user: Users ,@Body() dto: UpdateGenresDto): Promise<Genres> {
      if( !user.isAdmin ) {
        throw new UnauthorizedException(`Usuário ${user.name} não esta cadastrado como administrador`)
      }
      return this.genresService.update( id, dto);
    }

    @Delete(':id')
    @ApiOperation({
      summary: 'Deletar gênero pelo ID',
    })    
    delete(@Param('id') id: string, @LoggedUser() user: Users): Promise<Genres> {
      if( !user.isAdmin ) {
        throw new UnauthorizedException(`Usuário ${user.name} não esta cadastrado como administrador`)
      }
      return this.genresService.delete( id );
    }
}
