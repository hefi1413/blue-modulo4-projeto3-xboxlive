import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FavoriteDto } from './dto/favorite.dto';
import { FavoriteService } from './favorite.service';


@ApiTags('favorite')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Put(':id')
  @ApiOperation({
    summary: 'Favoritar jogos para um perfil de usuário',
  })    
  favorite(@Param('id') id: string, @Body() dto: FavoriteDto) {
    return this.favoriteService.favorite( id, dto,  )
  }
}