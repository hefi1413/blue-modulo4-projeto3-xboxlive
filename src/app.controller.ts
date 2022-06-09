import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('home')
@Controller('home')
export class AppController {
constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({
    summary: 'Status da aplicação',
  })
  getAppStatus(@Req() req: Request) {
    const baseUrl = req.protocol + '://' + req.get('host');
    return this.appService.getAppStatus(baseUrl);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()  
  @Get(':idprofile')
  @ApiOperation({
    summary: 'Retorna informações do perfil, jogos favoritos e gêneros relacionado ao id',
  })
  getHomepage(@Param('idprofile') idprofile: string,) {
    return this.appService.getHomepage(+idprofile);
  }

}
