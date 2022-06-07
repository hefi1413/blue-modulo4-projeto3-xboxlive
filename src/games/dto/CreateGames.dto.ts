import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString, IsUrl } from 'class-validator';

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
    })
    CoverImageUrl : string;

    @IsString()
    @ApiProperty({
      description: 'Descrição do jogo',
    })
    Description : string;

    @IsNumber()
    @IsPositive()
    @ApiProperty({
      description: 'Ano de lançamento do jogo',
    })
    Year :number;

    @IsNumber()
    @IsPositive()
    @ApiProperty({
      description: 'Ranking no site IMDB. Conhecido como Internet Movie Database',
    })
    ImdbScore :number;

    @IsUrl()
    @IsOptional()
    @ApiProperty({
      description: 'Url do trailler do jogo no Youtube',
    })
    TrailerYouTubeUrl: string;

    @IsUrl()
    @IsOptional()
    GameplayYouTubeUrl: string;

    genres: Object[];
}