import { ApiProperty } from '@nestjs/swagger';

export class AddUserDto {
  @ApiProperty()
  readonly name: string;
}
