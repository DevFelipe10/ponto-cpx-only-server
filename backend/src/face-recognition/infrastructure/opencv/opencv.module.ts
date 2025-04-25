import { Module } from '@nestjs/common'
import { OpencvController } from './opencv.controller'
import { OpencvService } from './opencv.service'
import { OpencvPersonService } from './opencv.person.service'
import { EnvConfigModule } from 'src/shared/infrastructure/env-config/env-config.module'
import { OpencvSearchService } from './opencv.search.service'
import { OpencvHttpService } from './opencv-http/opencv-http.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [EnvConfigModule, HttpModule],
  controllers: [OpencvController],
  providers: [
    OpencvService,
    OpencvPersonService,
    OpencvSearchService,
    OpencvHttpService,
  ],
})
export class OpencvModule {}
