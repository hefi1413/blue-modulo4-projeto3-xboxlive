import { PartialType } from '@nestjs/swagger';
import { CreateGenresDto } from './CreateGenres.dto';

export class UpdateGenresDto extends PartialType(CreateGenresDto) {}