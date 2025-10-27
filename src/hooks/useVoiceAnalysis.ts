import { useState, useRef, useCallback } from 'react'

interface VoiceMetrics {
  wordsPerMinute: number
  pauseFrequency: number
  averagePitch: number
  volumeLevel: number
  confidence: number
  clarity: number
  enthusiasm: number
  fillerWords: string[]
  speakingTime: number
  silenceTime: number
}

interface VoiceAnalysisResult {
  metrics: VoiceMetrics
  transcript: string
  suggestions: string[]
  overallScore: number
  strengths: string[]
  improvements: string[]
}

export const useVoiceAnalysis = () => {
  const [isListening, setIsListening] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<VoiceAnalysisResult | null>(null)
  const [realTimeMetrics, setRealTimeMetrics] = useState<Partial<VoiceMetrics>>({})
  
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  
  const startListening = useCallback(async () => {
    try {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) {
        throw new Error('Speech recognition not supported')
      }

      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      // Initialize audio context for real-time analysis
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream)
      
      // Create analyser for real-time metrics
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256
      microphoneRef.current.connect(analyserRef.current)

      let transcript = ''
      let wordCount = 0
      let startTime = Date.now()
      let lastWordTime = startTime
      let pauseCount = 0
      let totalPauseTime = 0
      const fillerWords = ['um', 'uh', 'like', 'you know', 'so', 'well', 'actually']
      const detectedFillers: string[] = []

      // Real-time audio analysis
      const analyzeAudio = () => {
        if (!analyserRef.current) return

        const bufferLength = analyserRef.current.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        analyserRef.current.getByteFrequencyData(dataArray)

        // Calculate volume level
        const volume = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength
        setRealTimeMetrics(prev => ({ ...prev, volumeLevel: volume }))

        // Calculate pitch (simplified)
        const pitch = dataArray.slice(0, 50).reduce((sum, value) => sum + value, 0) / 50
        setRealTimeMetrics(prev => ({ ...prev, averagePitch: pitch }))

        animationFrameRef.current = requestAnimationFrame(analyzeAudio)
      }

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        analyzeAudio()
      }

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
            wordCount += transcript.split(' ').length
            
            // Check for filler words
            fillerWords.forEach(filler => {
              if (transcript.toLowerCase().includes(filler)) {
                detectedFillers.push(filler)
              }
            })
            
            lastWordTime = Date.now()
          } else {
            interimTranscript += transcript
          }
        }

        transcript += finalTranscript
        
        // Calculate speaking metrics
        const currentTime = Date.now()
        const speakingTime = (currentTime - startTime) / 1000
        const wordsPerMinute = (wordCount / speakingTime) * 60
        
        // Detect pauses (simplified)
        if (currentTime - lastWordTime > 2000) {
          pauseCount++
          totalPauseTime += (currentTime - lastWordTime) / 1000
        }

        setRealTimeMetrics({
          wordsPerMinute: Math.round(wordsPerMinute),
          pauseFrequency: pauseCount,
          volumeLevel: realTimeMetrics.volumeLevel || 0,
          averagePitch: realTimeMetrics.averagePitch || 0,
          fillerWords: detectedFillers,
          speakingTime: speakingTime,
          silenceTime: totalPauseTime
        })
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }

      recognitionRef.current.start()
    } catch (error) {
      console.error('Error starting voice analysis:', error)
      setIsListening(false)
    }
  }, [realTimeMetrics])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    setIsListening(false)
  }, [])

  const analyzeSession = useCallback(async (sessionData: any) => {
    setIsAnalyzing(true)
    
    try {
      // Simulate advanced analysis
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const metrics: VoiceMetrics = {
        wordsPerMinute: sessionData.wordsPerMinute || 120,
        pauseFrequency: sessionData.pauseFrequency || 3,
        averagePitch: sessionData.averagePitch || 180,
        volumeLevel: sessionData.volumeLevel || 75,
        confidence: Math.floor(Math.random() * 30) + 70,
        clarity: Math.floor(Math.random() * 25) + 75,
        enthusiasm: Math.floor(Math.random() * 35) + 65,
        fillerWords: sessionData.fillerWords || ['um', 'like'],
        speakingTime: sessionData.speakingTime || 30,
        silenceTime: sessionData.silenceTime || 5
      }

      // Generate analysis
      const suggestions: string[] = []
      const strengths: string[] = []
      const improvements: string[] = []

      if (metrics.wordsPerMinute < 100) {
        suggestions.push('Try speaking a bit faster to maintain audience engagement')
        improvements.push('Pace - Consider increasing your speaking speed')
      } else if (metrics.wordsPerMinute > 180) {
        suggestions.push('Slow down slightly to improve clarity and comprehension')
        improvements.push('Pace - Consider slowing down for better clarity')
      } else {
        strengths.push('Excellent speaking pace')
      }

      if (metrics.fillerWords.length > 3) {
        suggestions.push('Practice reducing filler words like "um" and "uh"')
        improvements.push('Filler words - Practice pausing instead of using filler words')
      } else {
        strengths.push('Good control of filler words')
      }

      if (metrics.pauseFrequency < 2) {
        suggestions.push('Add more strategic pauses for emphasis and breathing')
        improvements.push('Pauses - Use pauses to emphasize key points')
      } else {
        strengths.push('Good use of pauses')
      }

      if (metrics.volumeLevel < 50) {
        suggestions.push('Project your voice more to ensure everyone can hear you')
        improvements.push('Volume - Practice projecting your voice')
      } else {
        strengths.push('Good volume projection')
      }

      if (metrics.confidence < 70) {
        suggestions.push('Work on building confidence through practice and preparation')
        improvements.push('Confidence - Practice more to build speaking confidence')
      } else {
        strengths.push('Confident delivery')
      }

      const overallScore = Math.round(
        (metrics.confidence + metrics.clarity + metrics.enthusiasm + 
         (100 - metrics.fillerWords.length * 10) + 
         (metrics.volumeLevel > 50 ? 100 : metrics.volumeLevel * 2)) / 5
      )

      const result: VoiceAnalysisResult = {
        metrics,
        transcript: sessionData.transcript || 'Sample transcript from your practice session...',
        suggestions,
        overallScore,
        strengths,
        improvements
      }

      setAnalysis(result)
    } catch (error) {
      console.error('Error analyzing voice:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  return {
    isListening,
    isAnalyzing,
    analysis,
    realTimeMetrics,
    startListening,
    stopListening,
    analyzeSession
  }
}
