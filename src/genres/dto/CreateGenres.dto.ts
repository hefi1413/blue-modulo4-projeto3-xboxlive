import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateGenresDto {
    @IsString()
    @ApiProperty({
      description: 'Nome do gênero',
      example: 'Action'
    })
    name: string;

    @IsUrl()
    @ApiProperty({
      description: 'Url da capa do gênero',
      example: 'https://m.media-amazon.com/images/I/712rPQQYj+L._AC_SX569_.jpg'
    })
    coverImageUrl : string;    
}