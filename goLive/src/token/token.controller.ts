/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Post} from "@nestjs/common";
import { TokenService } from "./token.service";
import { CreateTokenDto, ValidateTokenDto } from "./dto";

@Controller('token')
export class TokenController {
    constructor (private tokenService:TokenService){}

    @Post('create')
    create(@Body() dto:CreateTokenDto){
        return this.tokenService.create(dto)
    }

    @Post('validate')
    validate(@Body() dto:ValidateTokenDto){
        return this.tokenService.validate(dto)
    }
}