import { Get, Post, Body, Controller, HttpCode, HttpStatus, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { LoggedUser } from './logged-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Realizar login, recebendo um token de autenticação',
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {

    console.log('loginDto:',loginDto);

    return this.authService.login(loginDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Retorna o usuário autenticado no momento'
  })
  profile(@LoggedUser() user: Users) {
    return user;
  } 
  
  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()  
  @ApiOperation({
    summary: 'Retorna informações do perfil, jogos favoritos e gêneros relacionado ao id',
  })
  homepage(@Param('id') id: string) {
    return this.authService.getHomepage(id);
  }

}