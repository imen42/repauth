import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService , ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
  imports : [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
     inject : [ConfigService],
     useFactory: (config : ConfigService) =>{
      return {
        secret : config.get<string>('JWT_SECRET'),
        signOptions : {
          expiresIn : config.get<string | number>('JWT_EXPIRES'),
        },
      };
     }
    }),
    MongooseModule.forFeature([{name : 'User' , schema: UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
