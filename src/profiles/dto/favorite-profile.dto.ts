import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class FavoriteProfileDto {

    @IsArray()
    @Type(() => Object)
    @ApiProperty({
        description: 'Cria/altera o(s) jogo(s) favorito(s) deste perfil',
        example: '[{"id":1} , {"id":2}]'
    })
    "games": Object[];
}
