import { Module } from '@nestjs/common'
import { ApiService } from './api.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000, // Exemplo de configuração: tempo de espera
      maxRedirects: 5, // Exemplo de configuração: quantidade máxima de redirecionamentos
    }),
  ],
  providers: [ApiService],
})
export class ApiServiceModule {}
