import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Eye,
  Smile,
  Hand,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react'

interface AnalysisData {
  tone: {
    confidence: number
    enthusiasm: number
    clarity: number
    pace: number
  }
  volume: {
    average: number
    consistency: number
    projection: number
  }
  facial: {
    eyeContact: number
    smile: number
    expression: number
    engagement: number
  }
  gestures: {
    handMovement: number
    posture: number
    energy: number
    naturalness: number
  }
  overall: {
    score: number
    feedback: string[]
    suggestions: string[]
  }
}

interface AvatarTrainerProps {
  onAnalysisComplete?: (analysis: AnalysisData) => void
  onExperienceGain?: (points: number) => void
}

const AvatarTrainer: React.FC<AvatarTrainerProps> = ({ onAnalysisComplete, onExperienceGain }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisData | null>(null)
  const [sessionTime, setSessionTime] = useState(0)
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [avatarEmotion, setAvatarEmotion] = useState<'neutral' | 'encouraging' | 'focused' | 'impressed'>('neutral')
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<number | null>(null)

  // Simulate real-time analysis
  useEffect(() => {
    if (isRecording && isSessionActive) {
      const analysisInterval = setInterval(() => {
        // Simulate real-time feedback
        const randomImprovement = Math.random() * 0.1
        setCurrentAnalysis(prev => {
          if (!prev) return null
          return {
            ...prev,
            tone: {
              ...prev.tone,
              confidence: Math.min(100, prev.tone.confidence + randomImprovement),
              enthusiasm: Math.min(100, prev.tone.enthusiasm + randomImprovement)
            }
          }
        })
      }, 2000)

      return () => clearInterval(analysisInterval)
    }
  }, [isRecording, isSessionActive])

  const startSession = async () => {
    try {
      // Request camera and microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      })
      
      streamRef.current = stream
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      
      setIsVideoOn(true)
      setIsSessionActive(true)
      setAvatarEmotion('encouraging')
      
      // Start session timer
      intervalRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1)
      }, 1000)
      
    } catch (error) {
      console.error('Error accessing media devices:', error)
      alert('Please allow camera and microphone access to use the avatar trainer.')
    }
  }

  const stopSession = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    setIsRecording(false)
    setIsVideoOn(false)
    setIsSessionActive(false)
    setSessionTime(0)
    setAvatarEmotion('neutral')
  }

  const startRecording = () => {
    setIsRecording(true)
    setAvatarEmotion('focused')
    // Simulate recording start
  }

  const stopRecording = () => {
    setIsRecording(false)
    setIsAnalyzing(true)
    setAvatarEmotion('neutral')
    
    // Simulate analysis time
    setTimeout(() => {
      const analysis = generateAnalysis()
      setCurrentAnalysis(analysis)
      setIsAnalyzing(false)
      setAvatarEmotion('impressed')
      onAnalysisComplete?.(analysis)
      
      // Award experience points
      const points = Math.floor(analysis.overall.score / 10) + 20
      onExperienceGain?.(points)
    }, 3000)
  }

  const generateAnalysis = (): AnalysisData => {
    return {
      tone: {
        confidence: Math.floor(Math.random() * 40) + 60,
        enthusiasm: Math.floor(Math.random() * 30) + 70,
        clarity: Math.floor(Math.random() * 35) + 65,
        pace: Math.floor(Math.random() * 25) + 75
      },
      volume: {
        average: Math.floor(Math.random() * 20) + 80,
        consistency: Math.floor(Math.random() * 30) + 70,
        projection: Math.floor(Math.random() * 25) + 75
      },
      facial: {
        eyeContact: Math.floor(Math.random() * 30) + 70,
        smile: Math.floor(Math.random() * 40) + 60,
        expression: Math.floor(Math.random() * 35) + 65,
        engagement: Math.floor(Math.random() * 25) + 75
      },
      gestures: {
        handMovement: Math.floor(Math.random() * 30) + 70,
        posture: Math.floor(Math.random() * 25) + 75,
        energy: Math.floor(Math.random() * 35) + 65,
        naturalness: Math.floor(Math.random() * 30) + 70
      },
      overall: {
        score: Math.floor(Math.random() * 20) + 80,
        feedback: [
          "Great energy and enthusiasm!",
          "Your eye contact is improving",
          "Good use of hand gestures",
          "Pace is well-controlled"
        ],
        suggestions: [
          "Try varying your tone more",
          "Add more pauses for emphasis",
          "Use more facial expressions",
          "Practice projecting your voice"
        ]
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100'
    if (score >= 80) return 'bg-blue-100'
    if (score >= 70) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Avatar Section */}
      <div className="lg:w-1/2">
        <div className="card h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">AI Avatar Trainer</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                isSessionActive ? 'bg-green-500' : 'bg-gray-400'
              }`} />
              <span className="text-sm text-gray-600">
                {isSessionActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Avatar Display */}
          <div className="relative bg-gray-100 rounded-lg h-64 mb-4 overflow-hidden">
            {isVideoOn ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🤖</span>
                  </div>
                  <p className="text-gray-600">Start session to begin analysis</p>
                </div>
              </div>
            )}
            
            {/* Avatar Emotion Overlay */}
            <AnimatePresence>
              {avatarEmotion !== 'neutral' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
                >
                  {avatarEmotion === 'encouraging' && <span className="text-2xl">😊</span>}
                  {avatarEmotion === 'focused' && <span className="text-2xl">👁️</span>}
                  {avatarEmotion === 'impressed' && <span className="text-2xl">👏</span>}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Recording Indicator */}
            {isRecording && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center"
              >
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                Recording
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {!isSessionActive ? (
              <button
                onClick={startSession}
                className="w-full btn-primary flex items-center justify-center"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Training Session
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Session Time</span>
                  <span className="font-mono text-lg font-semibold">{formatTime(sessionTime)}</span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`flex-1 flex items-center justify-center py-3 rounded-lg font-medium transition-colors ${
                      isRecording
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <Pause className="h-5 w-5 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="h-5 w-5 mr-2" />
                        Start Recording
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={stopSession}
                    className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="lg:w-1/2">
        <div className="card h-full">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Analysis</h3>
          
          {isAnalyzing ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Target className="h-8 w-8 text-primary-600" />
                  </motion.div>
                </div>
                <p className="text-gray-600">Analyzing your performance...</p>
              </div>
            </div>
          ) : currentAnalysis ? (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full ${getScoreBg(currentAnalysis.overall.score)}`}>
                  <span className={`text-2xl font-bold ${getScoreColor(currentAnalysis.overall.score)}`}>
                    {currentAnalysis.overall.score}
                  </span>
                  <span className="ml-2 text-gray-600">/ 100</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Overall Performance Score</p>
              </div>

              {/* Detailed Analysis */}
              <div className="grid grid-cols-2 gap-4">
                {/* Tone Analysis */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Volume2 className="h-4 w-4 mr-2 text-blue-600" />
                    Tone & Voice
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Confidence</span>
                      <span className={getScoreColor(currentAnalysis.tone.confidence)}>
                        {currentAnalysis.tone.confidence}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${currentAnalysis.tone.confidence}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Enthusiasm</span>
                      <span className={getScoreColor(currentAnalysis.tone.enthusiasm)}>
                        {currentAnalysis.tone.enthusiasm}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${currentAnalysis.tone.enthusiasm}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Facial Analysis */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Eye className="h-4 w-4 mr-2 text-green-600" />
                    Facial Expression
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Eye Contact</span>
                      <span className={getScoreColor(currentAnalysis.facial.eyeContact)}>
                        {currentAnalysis.facial.eyeContact}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${currentAnalysis.facial.eyeContact}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Engagement</span>
                      <span className={getScoreColor(currentAnalysis.facial.engagement)}>
                        {currentAnalysis.facial.engagement}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${currentAnalysis.facial.engagement}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Gesture Analysis */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Hand className="h-4 w-4 mr-2 text-purple-600" />
                    Body Language
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Hand Movement</span>
                      <span className={getScoreColor(currentAnalysis.gestures.handMovement)}>
                        {currentAnalysis.gestures.handMovement}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${currentAnalysis.gestures.handMovement}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Posture</span>
                      <span className={getScoreColor(currentAnalysis.gestures.posture)}>
                        {currentAnalysis.gestures.posture}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${currentAnalysis.gestures.posture}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Volume Analysis */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Volume2 className="h-4 w-4 mr-2 text-orange-600" />
                    Volume Control
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Projection</span>
                      <span className={getScoreColor(currentAnalysis.volume.projection)}>
                        {currentAnalysis.volume.projection}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${currentAnalysis.volume.projection}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Consistency</span>
                      <span className={getScoreColor(currentAnalysis.volume.consistency)}>
                        {currentAnalysis.volume.consistency}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${currentAnalysis.volume.consistency}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Strengths
                  </h4>
                  <div className="space-y-1">
                    {currentAnalysis.overall.feedback.map((item, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-yellow-600" />
                    Areas for Improvement
                  </h4>
                  <div className="space-y-1">
                    {currentAnalysis.overall.suggestions.map((item, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Start a recording session to see your analysis</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AvatarTrainer
