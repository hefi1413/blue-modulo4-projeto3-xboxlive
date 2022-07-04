import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // Procura e checa se o user existe, usando o nickname
    const user =await this.prisma.users.findUnique({ where: { email:email } });

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    // Valida se a senha informada é correta
    const isHashValid = await bcrypt.compare(password, user.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({ email }),
      user,
    };
  }

  getHomepage(_id: number,) {
    return this.prisma.profiles.findMany({
      where: { id: _id },
      include: {
          games: {
            include: {
              genres: true
            }
          },
      }
    })
  }

  findAll() {
    return this.prisma.games.findMany({
        include: {
            genres: {
              orderBy: {
                name: 'asc',
              },
              select: {
                id: true,
                name: true,
              },
            },
          }, 
        }
    );
  }

}
