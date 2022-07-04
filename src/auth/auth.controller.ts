import { Get, Post, Body, Controller, HttpCode, HttpStatus, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { LoggedUser } from './logged-user.decorator';

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
    return this.authService.login(loginDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Retorna o usuário autenticado no momento',
  })
  @ApiBearerAuth()
  profile(@LoggedUser() user: Users): Users {
    return user;
  } 

  @UseGuards(AuthGuard())
  @ApiBearerAuth()  
  @Get(':idprofile')
  @ApiOperation({
    summary: 'Retorna informações do perfil, jogos favoritos e gêneros relacionado ao id',
  })
  Homepage(@Param('idprofile') idprofile: string,) {
    return this.authService.getHomepage(+idprofile);
  }

}