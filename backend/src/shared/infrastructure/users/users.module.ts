import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { EnvConfigModule } from '../env-config/env-config.module'
import { MistertModule } from 'src/face-recognition/infrastructure/mistert/mistert.module'

@Module({
  imports: [EnvConfigModule, MistertModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
