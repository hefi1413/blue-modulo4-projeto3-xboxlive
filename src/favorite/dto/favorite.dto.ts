import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class FavoriteDto {

    @IsArray()
    @Type(() => Object)
    @ApiProperty({
        description: 'adiciona/altera o(s) jogo(s) favorito(s) deste perfil',
        example: '[{"id":1} , {"id":2}]'
    })
    "games": Object[];
}
