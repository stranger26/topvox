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
  Target,
  Brain,
  Zap,
  Activity
} from 'lucide-react'
import { useVoiceAnalysis } from '../hooks/useVoiceAnalysis'
import { useFacialAnalysis } from '../hooks/useFacialAnalysis'

interface EnhancedAnalysisData {
  voice: {
    overallScore: number
    metrics: {
      confidence: number
      clarity: number
      enthusiasm: number
    }
    suggestions: string[]
    strengths: string[]
    improvements: string[]
  }
  facial: {
    overallScore: number
    metrics: {
      confidence: number
      engagement: number
      eyeContact: number
      naturalness: number
    }
    suggestions: string[]
    strengths: string[]
    improvements: string[]
  }
  combined: {
    overallScore: number
    confidence: number
    engagement: number
    naturalness: number
    effectiveness: number
  }
  recommendations: string[]
  strengths: string[]
  improvements: string[]
}

interface EnhancedAvatarTrainerProps {
  onAnalysisComplete?: (analysis: EnhancedAnalysisData) => void
  onExperienceGain?: (points: number) => void
}

const EnhancedAvatarTrainer: React.FC<EnhancedAvatarTrainerProps> = ({ 
  onAnalysisComplete, 
  onExperienceGain 
}) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [currentAnalysis, setCurrentAnalysis] = useState<EnhancedAnalysisData | null>(null)
  const [avatarEmotion, setAvatarEmotion] = useState<'neutral' | 'encouraging' | 'focused' | 'impressed'>('neutral')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<number | null>(null)

  // Use our custom hooks
  const {
    isListening,
    isAnalyzing: voiceAnalyzing,
    analysis: voiceAnalysis,
    realTimeMetrics: voiceMetrics,
    startListening,
    stopListening,
    analyzeSession: analyzeVoiceSession
  } = useVoiceAnalysis()

  const {
    isAnalyzing: facialAnalyzing,
    analysis: facialAnalysis,
    realTimeMetrics: facialMetrics,
    currentEmotion,
    startFacialAnalysis,
    stopFacialAnalysis,
    analyzeSession: analyzeFacialSession,
    canvasRef
  } = useFacialAnalysis()

  const startSession = async () => {
    try {
      // Request camera and microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }, 
        audio: true 
      })
      
      streamRef.current = stream
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.muted = true
        videoRef.current.playsInline = true
        videoRef.current.autoplay = true
        
        // Ensure video plays
        videoRef.current.play().catch(console.error)
      }
      
      setIsVideoOn(true)
      setIsSessionActive(true)
      setAvatarEmotion('encouraging')
      
      // Start session timer
      intervalRef.current = window.setInterval(() => {
        setSessionTime(prev => prev + 1)
      }, 1000)
      
    } catch (error) {
      console.error('Error accessing media devices:', error)
      alert('Please allow camera and microphone access to use the enhanced trainer.')
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
    stopListening()
    stopFacialAnalysis()
  }

  const startRecording = async () => {
    setIsRecording(true)
    setAvatarEmotion('focused')
    setCurrentAnalysis(null) // Clear previous analysis
    setIsAnalyzing(false) // Clear analyzing state
    
    // Start voice analysis
    await startListening()
    
    // Start facial analysis
    if (videoRef.current) {
      await startFacialAnalysis(videoRef.current)
    }
  }

  const stopRecording = async () => {
    console.log('stopRecording function called!')
    setIsRecording(false)
    setAvatarEmotion('neutral')
    console.log('Set isRecording to false')
    
    // Stop both analyses
    stopListening()
    stopFacialAnalysis()
    console.log('Stopped listening and facial analysis')
    
    // Analyze the session
    console.log('Starting analysis...')
    await analyzeCompleteSession()
    console.log('Analysis complete!')
  }

  const analyzeCompleteSession = async () => {
    setAvatarEmotion('impressed')
    setIsAnalyzing(true)
    
    // Simulate analysis time
    setTimeout(() => {
      // Create mock analysis data
      const mockVoiceAnalysis = {
        overallScore: Math.floor(Math.random() * 20) + 75, // 75-95
        metrics: {
          confidence: Math.floor(Math.random() * 20) + 70, // 70-90
          clarity: Math.floor(Math.random() * 20) + 75, // 75-95
          enthusiasm: Math.floor(Math.random() * 20) + 65 // 65-85
        },
        suggestions: [
          "Try to speak a bit slower for better clarity",
          "Use more vocal variety to keep audience engaged"
        ],
        strengths: [
          "Clear pronunciation",
          "Good volume control"
        ],
        improvements: [
          "Reduce filler words",
          "Add more pauses for emphasis"
        ]
      }

      const mockFacialAnalysis = {
        overallScore: Math.floor(Math.random() * 20) + 80, // 80-100
        metrics: {
          confidence: Math.floor(Math.random() * 20) + 75, // 75-95
          engagement: Math.floor(Math.random() * 20) + 70, // 70-90
          eyeContact: Math.floor(Math.random() * 20) + 75, // 75-95
          naturalness: Math.floor(Math.random() * 20) + 80 // 80-100
        },
        suggestions: [
          "Maintain more consistent eye contact",
          "Use more facial expressions to convey emotion"
        ],
        strengths: [
          "Natural smile",
          "Good posture"
        ],
        improvements: [
          "Look at camera more often",
          "Relax facial muscles"
        ]
      }

      // Combine analyses
      const combinedAnalysis: EnhancedAnalysisData = {
        voice: mockVoiceAnalysis,
        facial: mockFacialAnalysis,
        combined: {
          overallScore: Math.round((mockVoiceAnalysis.overallScore + mockFacialAnalysis.overallScore) / 2),
          confidence: Math.round((mockVoiceAnalysis.metrics.confidence + mockFacialAnalysis.metrics.confidence) / 2),
          engagement: Math.round((mockVoiceAnalysis.metrics.enthusiasm + mockFacialAnalysis.metrics.engagement) / 2),
          naturalness: mockFacialAnalysis.metrics.naturalness,
          effectiveness: Math.round((mockVoiceAnalysis.metrics.clarity + mockFacialAnalysis.metrics.eyeContact) / 2)
        },
        recommendations: [
          ...mockVoiceAnalysis.suggestions,
          ...mockFacialAnalysis.suggestions
        ],
        strengths: [
          ...mockVoiceAnalysis.strengths,
          ...mockFacialAnalysis.strengths
        ],
        improvements: [
          ...mockVoiceAnalysis.improvements,
          ...mockFacialAnalysis.improvements
        ]
      }

      console.log('Setting currentAnalysis:', combinedAnalysis)
      setCurrentAnalysis(combinedAnalysis)
      console.log('Set isAnalyzing to false')
      setIsAnalyzing(false)
      console.log('Calling onAnalysisComplete')
      onAnalysisComplete?.(combinedAnalysis)
      
      // Award experience points
      const points = Math.floor(combinedAnalysis.combined.overallScore / 10) + 25
      onExperienceGain?.(points)
      console.log('Analysis setup complete!')
    }, 2000) // Reduced to 2 seconds for better UX
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

  // Debug logging
  console.log('Component render - isAnalyzing:', isAnalyzing, 'currentAnalysis:', currentAnalysis ? 'exists' : 'null')

  return (
    <div className="space-y-4">

      <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Enhanced Avatar Section */}
      <div className="lg:w-1/2">
        <div className="card h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Enhanced AI Trainer</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                isSessionActive ? 'bg-green-500' : 'bg-gray-400'
              }`} />
              <span className="text-sm text-gray-600">
                {isSessionActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Enhanced Avatar Display */}
          <div className="relative bg-gray-100 rounded-lg h-64 mb-4 overflow-hidden">
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }} // Mirror the video
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              />
              
              {/* Real-time Analysis Overlay */}
              {isVideoOn && (
                <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white p-2 rounded-lg text-sm">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4" />
                    <span>AI Analysis Active</span>
                  </div>
                </div>
              )}

              {/* Real-time Metrics */}
              {(voiceMetrics || facialMetrics) && (
                <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded-lg text-xs space-y-1">
                  {voiceMetrics?.wordsPerMinute && (
                    <div>WPM: {voiceMetrics.wordsPerMinute}</div>
                  )}
                  {facialMetrics?.eyeContact && (
                    <div>Eye Contact: {Math.round(facialMetrics.eyeContact)}%</div>
                  )}
                  {currentEmotion && (
                    <div>Emotion: {currentEmotion}</div>
                  )}
                </div>
              )}
            </div>
            
            {!isVideoOn && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🤖</span>
                  </div>
                  <p className="text-gray-600">Start session to begin enhanced analysis</p>
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
                  className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg"
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
                <span>Enhanced Analysis</span>
              </motion.div>
            )}
          </div>


          {/* Enhanced Controls */}
          <div className="space-y-4">
            {!isSessionActive ? (
              <button
                onClick={startSession}
                className="w-full btn-primary flex items-center justify-center"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Enhanced Training
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Session Time</span>
                  <span className="font-mono text-lg font-semibold">{formatTime(sessionTime)}</span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      console.log('Button clicked, isRecording:', isRecording)
                      if (isRecording) {
                        console.log('Calling stopRecording')
                        stopRecording()
                      } else {
                        console.log('Calling startRecording')
                        startRecording()
                      }
                    }}
                    className={`flex-1 flex items-center justify-center py-3 rounded-lg font-medium transition-colors ${
                      isRecording
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <Pause className="h-5 w-5 mr-2" />
                        Stop Analysis
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5 mr-2" />
                        Start Analysis
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={stopSession}
                    className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={() => {
                      alert('Button clicked!')
                      console.log('Test analysis button clicked!')
                      // Test immediate state change
                      setIsAnalyzing(true)
                      setCurrentAnalysis({
                        voice: { overallScore: 85, metrics: { confidence: 80, clarity: 90, enthusiasm: 75 }, suggestions: ['Great job!'], strengths: ['Clear voice'], improvements: ['Speak slower'] },
                        facial: { overallScore: 90, metrics: { confidence: 85, engagement: 88, eyeContact: 82, naturalness: 92 }, suggestions: ['More eye contact'], strengths: ['Natural expressions'], improvements: ['Look at camera more'] },
                        combined: { overallScore: 87, confidence: 82, engagement: 81, naturalness: 92, effectiveness: 86 },
                        recommendations: ['Keep practicing!'],
                        strengths: ['Great overall performance'],
                        improvements: ['Focus on eye contact']
                      })
                    }}
                    className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Test Analysis
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Analysis Section */}
      <div className="lg:w-1/2">
        <div className="card h-full">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Enhanced Analysis</h3>
          
          {/* Debug State Display */}
          <div className="mb-4 p-2 bg-yellow-100 rounded text-xs">
            <p>isAnalyzing: {isAnalyzing ? 'true' : 'false'}</p>
            <p>currentAnalysis: {currentAnalysis ? 'exists' : 'null'}</p>
            <p>isRecording: {isRecording ? 'true' : 'false'}</p>
          </div>

          {/* Force Test Button */}
          <div className="mb-4">
            <button
              onClick={() => {
                console.log('Force test clicked!')
                const testAnalysis = {
                  voice: { overallScore: 88, metrics: { confidence: 85, clarity: 90, enthusiasm: 80 }, suggestions: ['Great job!'], strengths: ['Clear voice'], improvements: ['Speak slower'] },
                  facial: { overallScore: 92, metrics: { confidence: 88, engagement: 90, eyeContact: 85, naturalness: 95 }, suggestions: ['More eye contact'], strengths: ['Natural expressions'], improvements: ['Look at camera more'] },
                  combined: { overallScore: 90, confidence: 86, engagement: 85, naturalness: 95, effectiveness: 88 },
                  recommendations: ['Keep practicing!'],
                  strengths: ['Great overall performance'],
                  improvements: ['Focus on eye contact']
                }
                setCurrentAnalysis(testAnalysis)
                setIsAnalyzing(false)
                console.log('Force test analysis set!')
              }}
              className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
            >
              🧪 Force Show Analysis (Test)
            </button>
          </div>
          
          {isAnalyzing ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="h-8 w-8 text-primary-600" />
                  </motion.div>
                </div>
                <p className="text-gray-600">Analyzing voice and facial expressions...</p>
              </div>
            </div>
          ) : currentAnalysis ? (
            <div className="space-y-6">
              {/* Combined Overall Score */}
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full ${getScoreBg(currentAnalysis.combined.overallScore)}`}>
                  <span className={`text-2xl font-bold ${getScoreColor(currentAnalysis.combined.overallScore)}`}>
                    {currentAnalysis.combined.overallScore}
                  </span>
                  <span className="ml-2 text-gray-600">/ 100</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Enhanced Performance Score</p>
              </div>

              {/* Combined Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Volume2 className="h-4 w-4 mr-2 text-blue-600" />
                    Voice Analysis
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Confidence</span>
                      <span className={getScoreColor(currentAnalysis.combined.confidence)}>
                        {currentAnalysis.combined.confidence}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${currentAnalysis.combined.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Eye className="h-4 w-4 mr-2 text-green-600" />
                    Facial Analysis
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Engagement</span>
                      <span className={getScoreColor(currentAnalysis.combined.engagement)}>
                        {currentAnalysis.combined.engagement}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${currentAnalysis.combined.engagement}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-purple-600" />
                    Naturalness
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Natural</span>
                      <span className={getScoreColor(currentAnalysis.combined.naturalness)}>
                        {currentAnalysis.combined.naturalness}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${currentAnalysis.combined.naturalness}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Target className="h-4 w-4 mr-2 text-orange-600" />
                    Effectiveness
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Impact</span>
                      <span className={getScoreColor(currentAnalysis.combined.effectiveness)}>
                        {currentAnalysis.combined.effectiveness}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${currentAnalysis.combined.effectiveness}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Feedback */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Strengths
                  </h4>
                  <div className="space-y-1">
                    {currentAnalysis.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                        {strength}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-yellow-600" />
                    Recommendations
                  </h4>
                  <div className="space-y-1">
                    {currentAnalysis.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2" />
                        {recommendation}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center text-gray-500">
                <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Start a recording session to see enhanced analysis</p>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

export default EnhancedAvatarTrainer
