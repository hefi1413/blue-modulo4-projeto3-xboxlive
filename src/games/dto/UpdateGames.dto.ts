import { PartialType } from '@nestjs/swagger';
import { CreateGamesDto } from './CreateGames.dto';

export class UpdateGamesDto extends PartialType(CreateGamesDto) {}