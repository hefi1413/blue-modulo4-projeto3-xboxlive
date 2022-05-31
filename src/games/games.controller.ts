import { Controller, Get, Post, Patch, Delete, Body, Param, UnauthorizedException, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGamesDto } from './dto/CreateGames.dto';
import { UpdateGamesDto } from './dto/UpdateGames.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LoggedUser } from '../auth/logged-user.decorator';
import { Games  } from 'src/games/entities/games.entity';
import { Users } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('games')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @Get()
    @ApiOperation({
        summary: 'Localizar todos jogos',
    })    
    findAll(@LoggedUser() user: Users) {
      if( !user.isAdmin ) {
        throw new UnauthorizedException(`Usuário ${user.name} não esta cadastrado como administrador`)
      }
      return this.gamesService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Localizar um jogo pelo ID',
    })    
    findById(@Param('id') id: string,@LoggedUser() user: Users) {
      if( !user.isAdmin ) {
        throw new UnauthorizedException(`Usuário ${user.name} não esta cadastrado como administrador`)
      }
      return this.gamesService.findById(+id);
    }

    @Post()
    @ApiOperation({
        summary: 'Adicionar um jogo',
      })    
      create(@Body() dto: CreateGamesDto,@LoggedUser() user: Users) {
        if( !user.isAdmin ) {
          throw new UnauthorizedException(`Usuário ${user.name} não esta cadastrado como administrador`)
        }
        return this.gamesService.create(dto);
    }    

    @Patch(':id')
    @ApiOperation({
        summary: 'Editar um jogo pelo ID',
      })    
      update(@Param('id') id: string, @Body() dto: UpdateGamesDto ,@LoggedUser() user: Users): Promise<Games> {
        if( !user.isAdmin ) {
          throw new UnauthorizedException(`Usuário ${user.name} não esta cadastrado como administrador`)
        }
        return this.gamesService.update( +id, dto);
    }

    @Delete(':id')
    @ApiOperation({
      summary: 'Deletar jogo pelo ID',
    })    
    delete(@Param('id') id: string,@LoggedUser() user: Users): Promise<Games> {
      if( !user.isAdmin ) {
        throw new UnauthorizedException(`Usuário ${user.name} não esta cadastrado como administrador`)
      }
      return this.gamesService.delete( +id );
    }
}
