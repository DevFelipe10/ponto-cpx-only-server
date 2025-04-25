import { forwardRef, Module } from '@nestjs/common'
import { GeofenceService } from './geofence.service'
import { MistertModule } from 'src/face-recognition/infrastructure/mistert/mistert.module'

@Module({
  imports: [forwardRef(() => MistertModule)],
  providers: [GeofenceService],
  exports: [GeofenceService],
})
export class GeofenceModule {}
