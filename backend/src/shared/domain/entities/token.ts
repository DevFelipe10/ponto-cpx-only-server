export class Token {
  public readonly apiKey: string
  public readonly apiSecret: string

  constructor(apiKey?: string, apiSecret?: string) {
    this.apiKey = apiKey
    this.apiSecret = apiSecret
  }

  toJSON(): Required<{ apiKey: string; apiSecret: string }> {
    return {
      apiKey: this.apiKey,
      apiSecret: this.apiSecret,
    } as Required<{ apiKey: string; apiSecret: string }>
  }
}
