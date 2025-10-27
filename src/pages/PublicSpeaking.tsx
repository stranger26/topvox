import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mic, 
  Video, 
  Target, 
  Trophy, 
  Clock, 
  TrendingUp,
  Play,
  Pause,
  RotateCcw,
  Award,
  BarChart3,
  Lightbulb,
  Users,
  Volume2,
  Camera
} from 'lucide-react'
import AvatarTrainer from '../components/AvatarTrainer'
import EnhancedAvatarTrainer from '../components/EnhancedAvatarTrainer'
import AITrainer from '../components/AITrainer'
import WebcamDebug from '../components/WebcamDebug'
import SimpleWebcamTest from '../components/SimpleWebcamTest'
import { useUserStore } from '../store/userStore'
import toast from 'react-hot-toast'

const PublicSpeaking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'practice' | 'avatar' | 'debug' | 'simple' | 'ai'>('practice')
  const [sessionHistory, setSessionHistory] = useState<any[]>([])
  const [currentSession, setCurrentSession] = useState<any>(null)
  const { user, updateExperience, addAchievement } = useUserStore()

  const practiceTopics = [
    {
      title: "Elevator Pitch",
      description: "Practice introducing yourself in 30 seconds",
      duration: "30 seconds",
      difficulty: "Beginner",
      icon: Mic,
      color: "bg-blue-500"
    },
    {
      title: "Team Meeting",
      description: "Present your weekly update to the team",
      duration: "2 minutes",
      difficulty: "Intermediate",
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Client Presentation",
      description: "Pitch your idea to potential clients",
      duration: "5 minutes",
      difficulty: "Advanced",
      icon: Target,
      color: "bg-purple-500"
    },
    {
      title: "Conference Talk",
      description: "Deliver a keynote presentation",
      duration: "10 minutes",
      difficulty: "Expert",
      icon: Trophy,
      color: "bg-yellow-500"
    }
  ]

  const quickExercises = [
    {
      title: "Tongue Twisters",
      description: "Improve diction and clarity",
      duration: "2 min",
      icon: Volume2
    },
    {
      title: "Breathing Exercise",
      description: "Control nerves and voice projection",
      duration: "3 min",
      icon: Play
    },
    {
      title: "Confidence Building",
      description: "Power poses and positive affirmations",
      duration: "5 min",
      icon: Award
    }
  ]

  const handleAnalysisComplete = (analysis: any) => {
    const session = {
      id: Date.now(),
      timestamp: new Date(),
      analysis,
      topic: currentSession?.title || 'General Practice'
    }
    
    setSessionHistory(prev => [session, ...prev])
    
    // Show success toast
    toast.success(`Great job! You scored ${analysis.overall.score}/100`)
    
    // Check for achievements
    if (analysis.overall.score >= 90 && !user?.achievements.includes('Speaking Master')) {
      addAchievement('Speaking Master')
      toast.success('🏆 Achievement Unlocked: Speaking Master!')
    }
    
    if (analysis.tone.confidence >= 85 && !user?.achievements.includes('Confidence King')) {
      addAchievement('Confidence King')
      toast.success('🏆 Achievement Unlocked: Confidence King!')
    }
  }

  const handleExperienceGain = (points: number) => {
    updateExperience(points)
    toast.success(`+${points} XP gained!`)
  }

  const startPracticeSession = (topic: any) => {
    setCurrentSession(topic)
    setActiveTab('avatar')
    toast.success(`Starting practice: ${topic.title}`)
  }

  const getOverallProgress = () => {
    if (sessionHistory.length === 0) return 0
    const avgScore = sessionHistory.reduce((sum, session) => sum + session.analysis.overall.score, 0) / sessionHistory.length
    return Math.round(avgScore)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-bg rounded-2xl p-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Public Speaking Practice 🎤
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Master the art of confident communication with AI-powered analysis
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-primary-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Overall Progress: {getOverallProgress()}%
                </span>
              </div>
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Sessions: {sessionHistory.length}
                </span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="text-4xl">🎯</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'practice', label: 'Practice Topics', icon: Target },
          { id: 'avatar', label: 'Enhanced AI Trainer', icon: Video },
          { id: 'debug', label: 'Webcam Debug', icon: Camera },
          { id: 'simple', label: 'Simple Test', icon: Play },
          { id: 'ai', label: 'AI Coach', icon: Lightbulb }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="h-5 w-5 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Practice Topics Tab */}
      {activeTab === 'practice' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {practiceTopics.map((topic, index) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => startPracticeSession(topic)}
                >
                  <div className="flex items-start">
                    <div className={`p-3 rounded-lg ${topic.color} text-white mr-4`}>
                      <topic.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
                      <p className="text-gray-600 mb-3">{topic.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {topic.duration}
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {topic.difficulty}
                          </div>
                        </div>
                        <button className="btn-primary text-sm">
                          Start Practice
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Exercises */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Exercises</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickExercises.map((exercise, index) => (
                <motion.div
                  key={exercise.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-primary-100 rounded-lg mr-3">
                      <exercise.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{exercise.title}</h4>
                      <p className="text-sm text-gray-600">{exercise.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{exercise.duration}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Enhanced Avatar Trainer Tab */}
      {activeTab === 'avatar' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {currentSession && (
            <div className="mb-6 p-4 bg-primary-50 rounded-lg">
              <h3 className="font-semibold text-primary-900 mb-2">Current Session</h3>
              <p className="text-primary-700">{currentSession.title} - {currentSession.description}</p>
            </div>
          )}
          <EnhancedAvatarTrainer 
            onAnalysisComplete={handleAnalysisComplete}
            onExperienceGain={handleExperienceGain}
          />
        </motion.div>
      )}

      {/* Webcam Debug Tab */}
      {activeTab === 'debug' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <WebcamDebug />
        </motion.div>
      )}

      {/* Simple Test Tab */}
      {activeTab === 'simple' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SimpleWebcamTest />
        </motion.div>
      )}

      {/* AI Coach Tab */}
      {activeTab === 'ai' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-96"
        >
          <AITrainer 
            onExperienceGain={handleExperienceGain}
            onAchievementUnlock={(achievement) => {
              addAchievement(achievement)
              toast.success(`🏆 Achievement Unlocked: ${achievement}!`)
            }}
          />
        </motion.div>
      )}

      {/* Session History */}
      {sessionHistory.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Sessions</h3>
          <div className="space-y-3">
            {sessionHistory.slice(0, 5).map((session) => (
              <div key={session.id} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{session.topic}</h4>
                    <p className="text-sm text-gray-600">
                      {session.timestamp.toLocaleDateString()} at {session.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        {session.analysis.overall.score}/100
                      </div>
                      <div className="text-sm text-gray-600">Overall Score</div>
                    </div>
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PublicSpeaking
