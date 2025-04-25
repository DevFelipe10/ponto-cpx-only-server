export abstract class ResultFaceRecognition<Props = any> {
  public readonly request_id: string
  public readonly time_used: number
  public readonly props: Props

  constructor(props: Props, request_id: string, time_used: number) {
    this.props = props
    this.request_id = request_id
    this.time_used = time_used
  }

  toJSON(): Required<{ id: string; time_used: number } & Props> {
    return {
      id: this.request_id,
      time_used: this.time_used,
      ...this.props,
    } as Required<{ id: string; time_used: number } & Props>
  }
}
