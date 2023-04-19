import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty()
  readonly content: string;
  @ApiProperty()
  readonly senderId: string;
}
