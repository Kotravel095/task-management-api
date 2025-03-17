import { ApiProperty } from "@nestjs/swagger";

export class RegisterDTO {
    @ApiProperty({ description: "The email of the User" })
    readonly email: string;

    @ApiProperty({ description: "The password of the User" })
    readonly password: string;

    @ApiProperty({ description: "The name of the User" })
    readonly name: string;

    @ApiProperty({ description: "The telephone number of the User" })
    readonly tel: string;
}