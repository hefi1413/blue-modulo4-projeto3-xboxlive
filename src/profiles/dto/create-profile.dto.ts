import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsNumber } from 'class-validator';

export class CreateProfileDto {
    @IsString()
    @ApiProperty({
        description: 'Título do perfil',
        example: 'Master'
    })
    title: string;

    @IsUrl()
    @ApiProperty({
        description: 'Url da imagem do perfil',
        example: 'http://action/xxxx/yyy'
    })
    imageURL: string

    @IsString()
    @ApiProperty({
        description: 'ID do usuário proprietário deste perfil',
        example: '1'
    })
    userId: string
}
