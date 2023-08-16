/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import { TokenService } from "./token.service";
import { CreateTokenDto, ValidateTokenDto } from "./dto";
import { JwtGuard } from 'src/auth/guard';

@Controller('token')
export class TokenController {
    constructor (private tokenService:TokenService){}

    @UseGuards(JwtGuard)
    @Post('create')
    create(@Body() dto:CreateTokenDto){
        return this.tokenService.create(dto)
    }

    @UseGuards(JwtGuard)
    @Post('validate')
    validate(@Body() dto:ValidateTokenDto){
        return this.tokenService.validate(dto)
    }

    @UseGuards(JwtGuard)
    @Get('getAll/:userId')
    getTokens(@Param('userId') userId){
        return this.tokenService.getAllTokens(userId)
    }

    @UseGuards(JwtGuard)
    @Get('getAll/:userId/:validityStatus')
    getTokensByStatus(@Param('userId') userId, @Param('validityStatus') validityStatus,){
        return this.tokenService.getTokenByStatus(userId, validityStatus)
    }
}