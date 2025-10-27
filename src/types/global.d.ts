// Web Speech API types
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface Window {
  SpeechRecognition: {
    new(): SpeechRecognition
  }
  webkitSpeechRecognition: {
    new(): SpeechRecognition
  }
}

// Web Audio API types
interface AudioContext {
  createAnalyser(): AnalyserNode
  createMediaStreamSource(stream: MediaStream): MediaStreamAudioSourceNode
  state: AudioContextState
  sampleRate: number
}

interface AnalyserNode extends AudioNode {
  fftSize: number
  frequencyBinCount: number
  getByteFrequencyData(array: Uint8Array): void
  getByteTimeDomainData(array: Uint8Array): void
}

interface MediaStreamAudioSourceNode extends AudioNode {
  mediaStream: MediaStream
}

type AudioContextState = 'closed' | 'running' | 'suspended'

interface Window {
  AudioContext: {
    new(): AudioContext
  }
  webkitAudioContext: {
    new(): AudioContext
  }
}

