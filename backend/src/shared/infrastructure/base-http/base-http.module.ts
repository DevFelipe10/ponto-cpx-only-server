import { Module } from '@nestjs/common'
import { BaseHttpService } from './base-http.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  providers: [BaseHttpService],
})
export class BaseHttpModule {}
