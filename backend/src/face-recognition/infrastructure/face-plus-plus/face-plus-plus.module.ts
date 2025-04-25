import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { FacePlusPlusService } from './face-plus-plus.service'
import { EnvConfigService } from 'src/shared/infrastructure/env-config/env-config.service'
import { FacePlusPlusController } from './face-plus-plus.controller'

@Module({
  imports: [HttpModule],
  controllers: [FacePlusPlusController],
  providers: [
    EnvConfigService,
    FacePlusPlusService,
    // {
    //   provide: 'FaceRecognitionInterface',
    //   useClass: FacePlusPlusService,
    // },
  ],
})
export class FacePlusPlusModule {}
