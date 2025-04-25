import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { EnvConfigService } from '../env-config/env-config.service'
import { EnvConfigModule } from '../env-config/env-config.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth.guard'

@Module({
  imports: [
    UsersModule,
    EnvConfigModule,
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: (envConfigService: EnvConfigService) =>
        <JwtModuleOptions>{
          secret: envConfigService.getJwtSecret(),
          signOptions: { expiresIn: envConfigService.getJwtExpiresIn() },
        },
    }),
  ],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
