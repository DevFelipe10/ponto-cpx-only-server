import { Injectable } from '@nestjs/common'

@Injectable()
export class OpencvService {
  wrapBase64(base64: Base64URLString) {
    console.log(base64)

    return base64.split(',')[1] as Base64URLString
  }
}
