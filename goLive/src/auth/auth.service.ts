/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignupDto, SigninDto } from "./dto";
import * as argon from "argon2";
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { IUser } from "./model";

@Injectable()
export class AuthService {

    constructor(
        private prisma:PrismaService, 
        private jwt: JwtService,
        private config: ConfigService
        ){}

    async signup(dto: SignupDto){
        //generate the password hash
        const password = await argon.hash(dto.password)
        try{
            //create a new user in the db
            const user = await this.prisma.user.create({
                data: {
                    firstName:dto.firstName,
                    lastName:dto.lastName,
                    userName:dto.userName,
                    email:dto.email,
                    password: password
                }
            })

            // return the saved user
            return this.signToken(user.id, user.email);
        }catch (error) {
            if (
              error instanceof
              Prisma.PrismaClientKnownRequestError
            ) {
              if (error.code === 'P2002') {
                throw new ForbiddenException(
                  'Credentials taken',
                );
              }
            }
            throw error;
          }
    }

    async signin(dto: SigninDto){

        //find the user by email

        const user = await this.prisma.user.findUnique({
            where: {
                email:dto.email,
            },
        });

        if(!user)
            throw new ForbiddenException(
                'Credentials incorrect'
            );
        const pwMatches = await argon.verify(user.password, dto.password);

        if(!pwMatches)
            throw new ForbiddenException(
                'Credentials incorrect'
            );
        delete user.password
        const modified:IUser = user
        const access_token = await  this.signToken(user.id, user.email);
        modified.auth = access_token;

        return  {
          user:modified
        };
    }

    async signToken(
        userId: string,
        email: string,
      ): Promise<{ token: string, refresh:string }> {
        const payload = {
          sub: userId,
          email: email,
        };
        const secret = this.config.get('JWT_SECRET');
    
        const token = await this.jwt.signAsync(
          payload,
          {
            expiresIn: '15m',
            secret: secret,
          },
        );
    
        return {
          token: token,
          refresh:"0000-0000-0000-0000-0000",
        };
      }
}