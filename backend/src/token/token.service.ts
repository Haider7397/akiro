/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTokenDto, ValidateTokenDto } from "./dto";

@Injectable()
export class TokenService {

    constructor(
        private prisma: PrismaService,
    ) { }

    async create(dto: CreateTokenDto) {
        try {
            const generatedToken = this.generateToken(dto.allowedDigits);
            const tokens = await this.prisma.token.create({
                data: {
                    userId: dto.id,
                    token: generatedToken,
                }
            })
            return {
                data:tokens
            }

        } catch (error) {
            throw error
        }
    }

    generateToken(allowedDigits:string){
        let generatedToken=""
        for (let integration = 0; integration < 16; integration++) {
            generatedToken += allowedDigits[Math.floor(Math.random() * allowedDigits.length)];
            (integration+1)%4 == 0  && integration<14?generatedToken += "-":null
        }
        return generatedToken;
    }

    async validate(dto: ValidateTokenDto) {
        try {
            const validateToken = this.lunhAlgorith(dto.token.replace(/\-/g,""));
            const tokens = await this.prisma.token.update({
                where:{
                    token:dto.token
                },
                data:{
                    validityStatus:validateToken
                }
            })
            return {
                data:tokens
            }

        } catch (error) {
            throw error
        }
    }

    lunhAlgorith(token:string){
 
        const arr = (token + "")
        .split("")
        .reverse()
        .map((x) => parseInt(x));
        const lastDigit = arr.splice(0, 1)[0];
        let sum = arr.reduce(
            (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val)),0);
            sum += lastDigit;
            return sum % 10 === 0 ? "valid":"invalid";
    }

    async getAllTokens(userId:string){

        try{
            const tokens = await this.prisma.token.findMany({
                where:{
                    userId:userId
                }
            })
            const total = await this.prisma.token.count({where:{userId:userId}})
            const totalValid = await this.prisma.token.count(
                {
                    where:{
                        userId:userId,
                        validityStatus:"valid"
                    }
                }
            )
            const totalInvalid = await this.prisma.token.count(
                {
                    where:{
                        userId:userId,
                        validityStatus:"invalid"
                    }
                }
            )
            const totalUnknown= await this.prisma.token.count(
                {
                    where:{
                        userId:userId,
                        validityStatus:"unknown"
                    }
                }
            )

            return {
                data:tokens,
                count: total,
                valid:totalValid,
                invalid:totalInvalid,
                unknown:totalUnknown,
            }
        }catch (error) {
            throw error
        }

    }

    async getTokenByStatus(userId: string, validityStatus: string){

        try{
            const tokens = await this.prisma.token.findMany({
                where:{
                    userId: userId,
                    validityStatus: validityStatus
                }
            })

            return {
                data:tokens
            }
        }catch (error) {
            throw error
        }

    }

}