declare module 'mux.js/cjs/mp4/transmuxer.js' {
  export type TransmuxedSegment = Readonly<{
    data: Uint8Array
    initSegment: Uint8Array
    type: string
  }>

  export class Transmuxer {
    constructor(options?: Readonly<{ remux?: boolean }>)
    flush(): void
    on(
      event: 'data',
      listener: (segment: TransmuxedSegment) => void,
    ): void
    push(bytes: Uint8Array): void
    setRemux(remux: boolean): void
  }
}
