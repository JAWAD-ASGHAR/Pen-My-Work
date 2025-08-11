declare global {
  interface Window {
    createLemonSqueezy?: () => void
    LemonSqueezy?: {
      Url?: {
        Open: (url: string) => void
      }
    }
  }
}

export {}
