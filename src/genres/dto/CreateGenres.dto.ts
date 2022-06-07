import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenresDto {
    @IsString()
    @ApiProperty({
      description: 'Nome do gênero',
      example: 'Action'
    })
    name: string;
}