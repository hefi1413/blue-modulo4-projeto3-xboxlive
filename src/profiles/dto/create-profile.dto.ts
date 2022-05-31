import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsNumber } from 'class-validator';

export class CreateProfileDto {
    @IsString()
    @ApiProperty({
        description: 'Título do perfil',
        example: 'Monster'
    })
    title:      string;

    @IsUrl()
    @ApiProperty({
        description: 'Url da imagem do perfil',
        example: 'http://action/xxxx/yyy'
    })
    imageURL:     string

    @IsNumber()
    userId: number
}
