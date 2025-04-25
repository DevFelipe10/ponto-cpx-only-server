export type ErrorResponseOpencvProps = {
  code: string
  message: string
}

export class ErrorResponseOpencv {
  constructor(props: ErrorResponseOpencvProps) {
    this.code = props.code
    this.message = props.message
  }

  code: string
  message: string
}
