/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL_API: string
  readonly VITE_API_URL_AUTH: string
  readonly VITE_API_URL_FACE: string
  readonly VITE_API_URL_FACE_AUTHENTICATION: string
  readonly VITE_API_USERNAME: string
  readonly VITE_API_PASSWORD: string
  readonly VITE_API_URL_MISTERT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
