import { ApiProperty } from '@nestjs/swagger';

export class GetLatestMessagesDto {
  @ApiProperty()
  readonly limit: number;
}
