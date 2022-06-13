import { Controller, Get, Post, Body, Put, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FavoriteProfileDto } from './dto/favorite-profile.dto';

@ApiTags('profiles')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos perfis de usuário',
  })    
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retornar perfil por ID',
  })    
  findOne(@Param('id') id: string) {
    return this.profilesService.findById(+id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar perfil de usuário',
  })    
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Alterar perfil de usuário',
  })    
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover perfil de usuário',
  })    
  delete(@Param('id') id: string) {
    return this.profilesService.delete(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Favoritar jogos para um perfil de usuário',
  })    
  favorite(@Param('id') id: string, @Body() dto: FavoriteProfileDto) {
    return this.profilesService.favorite( +id, dto,  )
  }
}
