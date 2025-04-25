import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import multipart from '@fastify/multipart'
import { ValidationPipe } from '@nestjs/common'
import fastifyCookie from '@fastify/cookie'
import swaggerConfig from './shared/infrastructure/config/swagger-config'
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  // await app.register(cors, {
  //   origin: (origin, cb) => {
  //     const allowedOrigins = [
  //       'https://ponto-cpx-frontend.vercel.app',
  //       'http://localhost:5173',
  //       'https://192.168.3.54:5173',
  //       'https://10.0.2.2:5173',
  //     ]
  //     if (!origin || allowedOrigins.includes(origin)) {
  //       cb(null, true)
  //     } else {
  //       cb(new Error('Not allowed'), false)
  //     }
  //   },
  //   credentials: true,
  //   methods: ['GET', 'POST'],
  // })

  // Config cookies
  app.register(fastifyCookie, { secret: 'supersecret' })

  app.useGlobalPipes(new ValidationPipe())

  app.setGlobalPrefix('/api')

  await app.register(multipart)

  // Initialize Swagger Doc
  swaggerConfig(app)

  // // Configuração do CORS
  // await app.register(cors, {
  //   origin: (origin, callback) => {
  //     const allowedOrigins = ['http://localhost:5173']

  //     if (!origin) {
  //       // Bloqueia requisições sem origem (Postman, cURL, etc.)
  //       return callback(new Error('CORS blocked: Missing origin'), false)
  //     }

  //     if (allowedOrigins.includes(origin)) {
  //       return callback(null, true)
  //     } else {
  //       return callback(new Error('CORS blocked: Origin not allowed'), false)
  //     }
  //   },
  //   methods: ['GET', 'POST'],
  //   allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
  //   credentials: true, // Se precisar enviar cookies
  // })

  // app.enableCors(<CorsOptions>{
  //   origin: 'http://compex.com.br', // URL da fonte de origem permitida
  //   methods: ['POST'],
  //   credentials: true, // Habilita o envio de cookies
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // })

  // // Serve os arquivos do frontend Vite
  // await app.register(fastifyStatic, {
  //   root: join(__dirname, '..', '..', '..', 'frontend', 'dist'),
  //   prefix: '/', // Ou /app se quiser isolar
  //   decorateReply: false,
  //   wildcard: true, // Serve index.html para rotas não encontradas
  // })

  await app.listen(3000)
}
bootstrap()
