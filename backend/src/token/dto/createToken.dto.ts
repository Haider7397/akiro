/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString } from 'class-validator';
export class CreateTokenDto {

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  allowedDigits: string;
}