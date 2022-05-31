import { PartialType } from '@nestjs/swagger';
import { CreateGendersDto } from './CreateGenders.dto';

export class UpdateGendersDto extends PartialType(CreateGendersDto) {}