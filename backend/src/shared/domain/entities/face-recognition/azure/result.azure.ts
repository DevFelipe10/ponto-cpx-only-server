export abstract class ResultAzure {
  public readonly request_id: string
  public readonly time_used: number

  constructor(request_id: string, time_used: number) {
    this.request_id = request_id
    this.time_used = time_used
  }

  toJSON(): Required<{ id: string; time_used: number }> {
    return {
      id: this.request_id,
      time_used: this.time_used,
    } as Required<{ id: string; time_used: number }>
  }
}
