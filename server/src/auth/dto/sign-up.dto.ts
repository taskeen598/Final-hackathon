import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: "Please enter the correct email" })
    readonly email: string;

    @ApiProperty()
    readonly profileImage:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @IsStrongPassword()
    readonly password: string
}