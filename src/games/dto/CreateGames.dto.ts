import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString, IsUrl, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGamesDto {
    @IsString()
    @ApiProperty({
      description: 'Título do jogo',
      example: 'NBA 2K22'
    })
    title: string;
    
    @IsUrl()
    @ApiProperty({
      description: 'Url da capa do jogo',
      example: 'https://m.media-amazon.com/images/I/712rPQQYj+L._AC_SX569_.jpg'
    })
    CoverImageUrl : string;

    @IsString()
    @ApiProperty({
      description: 'Descrição do jogo',
      example: 'É uma simulação de basquete desenvolvido pela Visual Concepts e publicado pela 2K Sports, baseado na NBA. 23ª edição da franquia NBA 2K',
    })
    Description : string;

    @IsString()
    @ApiProperty({
      description: 'Ano de lançamento do jogo',
      example: '2021'
    })
    Year :string;

    @IsString()
    @ApiProperty({
      description: 'Ranking no site IMDB. Conhecido como Internet Movie Database',
      example: 4
    })
    ImdbScore :string;

    @IsUrl()
    @IsOptional()
    @ApiProperty({
      description: 'Url do trailler do jogo no Youtube',
      example: 'https://www.youtube.com/watch?v=uVPkZubI8Ps'
    })
    TrailerYouTubeUrl: string;

    @IsUrl()
    @IsOptional()
    @ApiProperty({
      description: 'Url do trailler do jogo no Gameplay',
      example: 'https://www.youtube.com/watch?v=uVPkZubI8Ps'
    })
    GameplayYouTubeUrl: string;

    @IsArray()
    @Type(() => Object)    
    @IsOptional()
    @ApiProperty({
      description: 'Gênero(s) deste jogo.',
      example: '[{"id":1}, {"id":2}]'
    })
    genres: Object[];
}