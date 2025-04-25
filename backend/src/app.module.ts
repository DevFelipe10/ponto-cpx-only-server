import { Module } from '@nestjs/common'
// import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { HttpModule } from '@nestjs/axios'
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module'
import { FacePlusPlusModule } from './face-recognition/infrastructure/face-plus-plus/face-plus-plus.module'
import { AzureModule } from './face-recognition/infrastructure/azure/azure.module'
import { MistertModule } from './face-recognition/infrastructure/mistert/mistert.module'
import { AuthModule } from './shared/infrastructure/auth/auth.module'
import { UsersModule } from './shared/infrastructure/users/users.module'
import { OpencvModule } from './face-recognition/infrastructure/opencv/opencv.module'
import { BaseHttpModule } from './shared/infrastructure/base-http/base-http.module'
import { RolesModule } from './shared/infrastructure/roles/roles.module'
import { GeofenceModule } from './shared/infrastructure/geofence/geofence.module'

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../..', 'frontend', 'dist'),
    // }),
    EnvConfigModule,
    FacePlusPlusModule,
    AzureModule,
    MistertModule,
    AuthModule,
    UsersModule,
    OpencvModule,
    BaseHttpModule,
    RolesModule,
    GeofenceModule,
  ],
})
export class AppModule {}
