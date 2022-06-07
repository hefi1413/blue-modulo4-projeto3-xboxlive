import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @ApiProperty({
      description: 'Nome do usuário',
      example: 'nome um'
    })
    name: string;

    @IsString()
    @ApiProperty({
      description: 'Email do usuário',
      example: 'nome1@gmail.com'
    })
    email: string;

    @IsString()
    @ApiProperty({
      description: 'Senha do usuário',
      example: 'teste'
    })
    password:  string;

    @IsString()
    @ApiProperty({
      description: 'Confirmação da senha do usuário',
      example: 'teste'
    })
    confirmPassword:  string;

    @IsString()
    @ApiProperty({
      description: 'Cpf do usuário',
      example: '987453687693'
    })
    cpf:       string;
    
    @IsBoolean()
    @ApiProperty({
      description: 'Informa se este usuário é um administrador',
      example: 'false'
    })
    isAdmin:   boolean;
}
function IsString() {
    throw new Error("Function not implemented.");
}

function ApiProperty(arg0: { description: string; example: string; }) {
    throw new Error("Function not implemented.");
}

