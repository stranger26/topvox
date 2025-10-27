import { useState, useRef, useCallback } from 'react'

interface FacialMetrics {
  eyeContact: number
  smileFrequency: number
  expressionVariety: number
  engagement: number
  confidence: number
  naturalness: number
  headMovement: number
  blinkRate: number
}

interface EmotionData {
  joy: number
  surprise: number
  anger: number
  fear: number
  sadness: number
  disgust: number
  neutral: number
}

interface FacialAnalysisResult {
  metrics: FacialMetrics
  emotions: EmotionData
  suggestions: string[]
  overallScore: number
  strengths: string[]
  improvements: string[]
  emotionTimeline: { timestamp: number; emotion: string; intensity: number }[]
}

export const useFacialAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<FacialAnalysisResult | null>(null)
  const [realTimeMetrics, setRealTimeMetrics] = useState<Partial<FacialMetrics>>({})
  const [currentEmotion, setCurrentEmotion] = useState<string>('neutral')
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const emotionTimelineRef = useRef<{ timestamp: number; emotion: string; intensity: number }[]>([])

  const startFacialAnalysis = useCallback(async (videoElement: HTMLVideoElement) => {
    try {
      if (videoRef.current) {
        videoRef.current = videoElement
      }
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      setIsAnalyzing(true)

      // Simulate facial analysis with canvas overlay
      const analyzeFrame = () => {
        if (!videoRef.current || !canvas) return

        const video = videoRef.current
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw video frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Simulate face detection and analysis
        const mockAnalysis = {
          eyeContact: Math.random() * 40 + 60, // 60-100
          smileFrequency: Math.random() * 30 + 20, // 20-50
          expressionVariety: Math.random() * 25 + 50, // 50-75
          engagement: Math.random() * 35 + 65, // 65-100
          confidence: Math.random() * 30 + 70, // 70-100
          naturalness: Math.random() * 20 + 80, // 80-100
          headMovement: Math.random() * 15 + 5, // 5-20
          blinkRate: Math.random() * 10 + 15 // 15-25 blinks per minute
        }

        // Simulate emotion detection
        const emotions = {
          joy: Math.random() * 0.8,
          surprise: Math.random() * 0.3,
          anger: Math.random() * 0.1,
          fear: Math.random() * 0.1,
          sadness: Math.random() * 0.1,
          disgust: Math.random() * 0.05,
          neutral: Math.random() * 0.6
        }

        // Find dominant emotion
        const dominantEmotion = Object.entries(emotions).reduce((a, b) => 
          emotions[a[0] as keyof EmotionData] > emotions[b[0] as keyof EmotionData] ? a : b
        )

        setCurrentEmotion(dominantEmotion[0])
        setRealTimeMetrics(mockAnalysis)

        // Add to emotion timeline
        emotionTimelineRef.current.push({
          timestamp: Date.now(),
          emotion: dominantEmotion[0],
          intensity: dominantEmotion[1]
        })

        // Keep only last 30 seconds of data
        const thirtySecondsAgo = Date.now() - 30000
        emotionTimelineRef.current = emotionTimelineRef.current.filter(
          entry => entry.timestamp > thirtySecondsAgo
        )

        // Draw analysis overlay
        drawAnalysisOverlay(ctx, mockAnalysis, dominantEmotion[0])

        animationFrameRef.current = requestAnimationFrame(analyzeFrame)
      }

      analyzeFrame()
    } catch (error) {
      console.error('Error starting facial analysis:', error)
      setIsAnalyzing(false)
    }
  }, [])

  const drawAnalysisOverlay = (ctx: CanvasRenderingContext2D, metrics: FacialMetrics, emotion: string) => {
    // Draw face detection box (simulated)
    ctx.strokeStyle = '#00ff00'
    ctx.lineWidth = 2
    ctx.strokeRect(50, 50, 200, 250)

    // Draw eye contact indicator
    ctx.fillStyle = metrics.eyeContact > 70 ? '#00ff00' : '#ff0000'
    ctx.beginPath()
    ctx.arc(100, 120, 5, 0, 2 * Math.PI)
    ctx.fill()

    // Draw smile indicator
    ctx.fillStyle = metrics.smileFrequency > 30 ? '#00ff00' : '#ffaa00'
    ctx.beginPath()
    ctx.arc(150, 200, 8, 0, 2 * Math.PI)
    ctx.fill()

    // Draw emotion indicator
    ctx.fillStyle = '#0066ff'
    ctx.font = '16px Arial'
    ctx.fillText(emotion.toUpperCase(), 50, 320)

    // Draw confidence meter
    const confidenceWidth = (metrics.confidence / 100) * 200
    ctx.fillStyle = '#333333'
    ctx.fillRect(50, 340, 200, 10)
    ctx.fillStyle = metrics.confidence > 80 ? '#00ff00' : metrics.confidence > 60 ? '#ffaa00' : '#ff0000'
    ctx.fillRect(50, 340, confidenceWidth, 10)
  }

  const stopFacialAnalysis = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    setIsAnalyzing(false)
  }, [])

  const analyzeSession = useCallback(async (_sessionData: any) => {
    setIsAnalyzing(true)
    
    try {
      // Simulate advanced facial analysis
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const metrics: FacialMetrics = {
        eyeContact: Math.floor(Math.random() * 30) + 70,
        smileFrequency: Math.floor(Math.random() * 25) + 25,
        expressionVariety: Math.floor(Math.random() * 20) + 60,
        engagement: Math.floor(Math.random() * 25) + 75,
        confidence: Math.floor(Math.random() * 20) + 80,
        naturalness: Math.floor(Math.random() * 15) + 85,
        headMovement: Math.floor(Math.random() * 10) + 5,
        blinkRate: Math.floor(Math.random() * 8) + 16
      }

      const emotions: EmotionData = {
        joy: Math.random() * 0.7,
        surprise: Math.random() * 0.3,
        anger: Math.random() * 0.1,
        fear: Math.random() * 0.1,
        sadness: Math.random() * 0.1,
        disgust: Math.random() * 0.05,
        neutral: Math.random() * 0.5
      }

      const suggestions: string[] = []
      const strengths: string[] = []
      const improvements: string[] = []

      // Analyze eye contact
      if (metrics.eyeContact < 60) {
        suggestions.push('Practice maintaining eye contact with your audience')
        improvements.push('Eye Contact - Look directly at your audience more often')
      } else if (metrics.eyeContact > 85) {
        strengths.push('Excellent eye contact')
      } else {
        strengths.push('Good eye contact')
      }

      // Analyze smile frequency
      if (metrics.smileFrequency < 20) {
        suggestions.push('Try smiling more to appear more approachable and engaging')
        improvements.push('Facial Expression - Use more smiles to connect with your audience')
      } else if (metrics.smileFrequency > 40) {
        suggestions.push('Balance your expressions - too much smiling can seem forced')
        improvements.push('Expression Balance - Vary your facial expressions naturally')
      } else {
        strengths.push('Good use of facial expressions')
      }

      // Analyze expression variety
      if (metrics.expressionVariety < 50) {
        suggestions.push('Vary your facial expressions to keep your audience engaged')
        improvements.push('Expression Variety - Use different facial expressions to emphasize points')
      } else {
        strengths.push('Good variety in facial expressions')
      }

      // Analyze engagement
      if (metrics.engagement < 70) {
        suggestions.push('Work on appearing more engaged and enthusiastic')
        improvements.push('Engagement - Show more enthusiasm and energy')
      } else {
        strengths.push('High engagement level')
      }

      // Analyze confidence
      if (metrics.confidence < 70) {
        suggestions.push('Practice confident body language and facial expressions')
        improvements.push('Confidence - Work on projecting confidence through your expressions')
      } else {
        strengths.push('Confident facial expressions')
      }

      // Analyze naturalness
      if (metrics.naturalness < 80) {
        suggestions.push('Relax and be more natural in your expressions')
        improvements.push('Naturalness - Practice being more relaxed and authentic')
      } else {
        strengths.push('Natural and authentic expressions')
      }

      const overallScore = Math.round(
        (metrics.eyeContact + metrics.engagement + metrics.confidence + 
         metrics.naturalness + (100 - metrics.headMovement * 2)) / 5
      )

      const result: FacialAnalysisResult = {
        metrics,
        emotions,
        suggestions,
        overallScore,
        strengths,
        improvements,
        emotionTimeline: emotionTimelineRef.current
      }

      setAnalysis(result)
    } catch (error) {
      console.error('Error analyzing facial expressions:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  return {
    isAnalyzing,
    analysis,
    realTimeMetrics,
    currentEmotion,
    startFacialAnalysis,
    stopFacialAnalysis,
    analyzeSession,
    canvasRef
  }
}
