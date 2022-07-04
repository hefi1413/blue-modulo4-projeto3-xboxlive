import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';


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

  @Get()
  @ApiOperation({
    summary: 'Hello da aplicação',
  })
  root() {
    return '******* XBOX Live ********';
  }
  
}
