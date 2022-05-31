import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { GendersService } from './genders.service';
import { CreateGendersDto } from './dto/CreateGenders.dto';
import { UpdateGendersDto } from './dto/UpdateGenders.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Genders } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('genders')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('genders')
export class GendersController {
    constructor(private readonly gendersService: GendersService) {}

    @Get()
    findAll() {
        return this.gendersService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Localizar um gênero pelo ID',
    })    
    findOne(@Param('id') id: string) {
      return this.gendersService.findById(+id);
    }

    @Post()
    create(@Body() dto: CreateGendersDto) {
        return this.gendersService.create(dto);
    }    

    @Patch(':id')
    @ApiOperation({
      summary: 'Editar um gênero pelo ID',
    })    
    update(@Param('id') id: string, @Body() dto: UpdateGendersDto): Promise<Genders> {
        return this.gendersService.update( +id, dto);
    }

    @Delete(':id')
    @ApiOperation({
      summary: 'Deletar gênero pelo ID',
    })    
    delete(@Param('id') id: string,): Promise<Genders> {
        return this.gendersService.delete( +id );
    }
}
