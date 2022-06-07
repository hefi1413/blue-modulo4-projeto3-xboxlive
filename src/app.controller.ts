import { Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

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

  @Get(':idprofile')
  @ApiOperation({
    summary: 'ID do profile do usuário',
  })
  getHomepage(@Param('idprofile') idprofile: string,) {
    return this.appService.getHomepage(+idprofile);
  }

}
