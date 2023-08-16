/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Get, Param, Post} from "@nestjs/common";
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

    @Get('getAll/:userId')
    getTokens(@Param('userId') userId){
        return this.tokenService.getAllTokens(userId)
    }
    @Get('getAll/:userId/:validityStatus')
    getTokensByStatus(@Param('userId') userId, @Param('validityStatus') validityStatus,){
        return this.tokenService.getTokenByStatus(userId, validityStatus)
    }
}