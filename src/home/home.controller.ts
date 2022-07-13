import { Controller, Get, Param, UnauthorizedException, UseGuards } from '@nestjs/common';
import { HomeService } from '../home/home.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LoggedUser } from '../auth/logged-user.decorator';
import { Users } from '../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('home')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) {}

    @Get(':id')
    @ApiOperation({
        summary: 'Localizar todos jogos de um gênero',
    })    
    findAll(@Param('id') id: string, @LoggedUser() user: Users) {
      if( !user.isAdmin ) {
        throw new UnauthorizedException(`Usuário ${user.name} não esta cadastrado como administrador`)
      }
      return this.homeService.getGamesByGenre(id);
    }
  }