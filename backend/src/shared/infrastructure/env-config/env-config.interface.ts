export interface EnvConfig {
  getAppPort(): number
  getNodeEnv(): string

  // MisterT
  getMisterTBaseUrl(): string

  // Face++
  getFaceppBaseUrl(): string
  getFaceppApiKey(): string
  getFaceppApiSecret(): string
  getFaceppListId(): string

  // Azure
  getAzureBaseUrl(): string
  getAzureApiKey(): string
}
