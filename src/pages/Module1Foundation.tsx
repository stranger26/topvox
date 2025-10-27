import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mic, 
  Video, 
  Eye, 
  Volume2, 
  Target, 
  Clock, 
  Trophy, 
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Brain,
  Users,
  MessageSquare,
  Zap,
  Award,
  BarChart3,
  Ear
} from 'lucide-react'
import { useUserStore } from '../store/userStore'
import toast from 'react-hot-toast'

const Module1Foundation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'listening' | 'nonverbal' | 'vocal' | 'clarity'>('overview')
  const [currentExercise, setCurrentExercise] = useState<any>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [exerciseResults, setExerciseResults] = useState<any[]>([])
  const { user, updateExperience, addAchievement } = useUserStore()

  const moduleOverview = {
    title: "Module 1: The Foundation - Verbal & Non-Verbal Mastery",
    description: "Master the fundamental skills that form the bedrock of effective communication",
    duration: "4-6 weeks",
    difficulty: "Beginner to Intermediate",
    skills: [
      "Active Listening",
      "Non-Verbal Cues", 
      "Vocal Delivery",
      "Clarity & Conciseness"
    ]
  }

  const activeListeningExercises = [
    {
      id: 'scenario-1',
      title: "Scenario-Based Listening Test",
      description: "Listen to workplace scenarios and demonstrate understanding",
      duration: "5 minutes",
      type: "scenario",
      difficulty: "Beginner",
      points: 25,
      scenarios: [
        {
          audio: "A colleague explaining a project delay",
          question: "What are the main reasons for the delay?",
          correctAnswers: ["Resource shortage", "Timeline miscalculation", "Scope changes"]
        },
        {
          audio: "A client expressing concerns about a proposal",
          question: "What are the client's primary concerns?",
          correctAnswers: ["Budget constraints", "Timeline feasibility", "Feature requirements"]
        }
      ]
    },
    {
      id: 'paraphrasing-1',
      title: "Paraphrasing Exercise",
      description: "Practice restating what you've heard in your own words",
      duration: "3 minutes",
      type: "paraphrasing",
      difficulty: "Beginner",
      points: 20,
      prompts: [
        "Your manager explains a new company policy",
        "A team member shares their project challenges",
        "A client describes their business needs"
      ]
    },
    {
      id: 'listening-vs-reply',
      title: "Listening to Understand vs. Reply",
      description: "Distinguish between active listening and preparing to respond",
      duration: "4 minutes",
      type: "comparison",
      difficulty: "Intermediate",
      points: 30,
      exercises: [
        {
          scenario: "Colleague shares personal struggle",
          task: "Identify if you're listening to understand or to reply",
          correctApproach: "Listen to understand"
        }
      ]
    }
  ]

  const nonverbalExercises = [
    {
      id: 'posture-1',
      title: "Posture Assessment",
      description: "Record yourself and analyze your body language",
      duration: "3 minutes",
      type: "video",
      difficulty: "Beginner",
      points: 20,
      checklist: [
        "Shoulders back and relaxed",
        "Sitting/standing straight",
        "Feet planted firmly",
        "Open body position"
      ]
    },
    {
      id: 'eye-contact-1',
      title: "Eye Contact Practice",
      description: "Practice maintaining appropriate eye contact",
      duration: "2 minutes",
      type: "video",
      difficulty: "Beginner",
      points: 15,
      guidelines: [
        "Look at camera for 3-5 seconds",
        "Break eye contact naturally",
        "Avoid staring or darting eyes",
        "Match eye contact to conversation flow"
      ]
    },
    {
      id: 'gesture-1',
      title: "Gesture Matching",
      description: "Match body language to intended tone",
      duration: "4 minutes",
      type: "video",
      difficulty: "Intermediate",
      points: 25,
      scenarios: [
        { tone: "Confident", gestures: ["Open palms", "Upright posture", "Direct eye contact"] },
        { tone: "Empathetic", gestures: ["Leaning forward", "Nodding", "Open body language"] },
        { tone: "Authoritative", gestures: ["Firm stance", "Controlled gestures", "Steady eye contact"] }
      ]
    },
    {
      id: 'virtual-presence',
      title: "Virtual Presence Mastery",
      description: "Optimize your camera presence for video calls",
      duration: "5 minutes",
      type: "video",
      difficulty: "Intermediate",
      points: 30,
      tips: [
        "Camera at eye level",
        "Good lighting on your face",
        "Clean, professional background",
        "Appropriate distance from camera"
      ]
    }
  ]

  const vocalDeliveryExercises = [
    {
      id: 'tone-analysis',
      title: "Tone Analysis",
      description: "Record and analyze your vocal tone",
      duration: "3 minutes",
      type: "audio",
      difficulty: "Beginner",
      points: 20,
      metrics: [
        "Warmth and friendliness",
        "Confidence level",
        "Professionalism",
        "Engagement"
      ]
    },
    {
      id: 'pacing-practice',
      title: "Pacing Practice",
      description: "Work on speaking at the right speed",
      duration: "4 minutes",
      type: "audio",
      difficulty: "Beginner",
      points: 25,
      targets: [
        "150-160 words per minute",
        "Natural pauses",
        "Varied rhythm",
        "Clear articulation"
      ]
    },
    {
      id: 'filler-word-challenge',
      title: "Filler Word Challenge",
      description: "Eliminate 'um', 'like', 'you know' from your speech",
      duration: "5 minutes",
      type: "audio",
      difficulty: "Intermediate",
      points: 35,
      commonFillers: ["um", "uh", "like", "you know", "so", "actually", "basically"],
      strategies: [
        "Pause instead of filling",
        "Plan your thoughts",
        "Practice speaking slowly",
        "Record and review"
      ]
    },
    {
      id: 'projection-exercise',
      title: "Voice Projection",
      description: "Practice speaking with appropriate volume and energy",
      duration: "3 minutes",
      type: "audio",
      difficulty: "Intermediate",
      points: 25,
      techniques: [
        "Breathe from diaphragm",
        "Speak from chest, not throat",
        "Vary volume for emphasis",
        "Maintain energy throughout"
      ]
    }
  ]

  const clarityExercises = [
    {
      id: 'prep-method',
      title: "PREP Method Practice",
      description: "Structure thoughts using Point, Reason, Example, Point",
      duration: "4 minutes",
      type: "structured",
      difficulty: "Intermediate",
      points: 30,
      template: {
        point: "State your main point clearly",
        reason: "Explain why this point matters",
        example: "Provide a specific example",
        restate: "Restate your point for emphasis"
      },
      prompts: [
        "Why should we invest in new technology?",
        "How can we improve team collaboration?",
        "What's the best approach to customer service?"
      ]
    },
    {
      id: 'timed-summary',
      title: "Timed Summary Exercise",
      description: "Summarize complex information in 30 seconds",
      duration: "3 minutes",
      type: "timed",
      difficulty: "Advanced",
      points: 40,
      challenges: [
        "Explain a quarterly report in 30 seconds",
        "Summarize a meeting outcome in 20 seconds",
        "Present a project update in 45 seconds"
      ]
    },
    {
      id: 'sentence-refinement',
      title: "Sentence Refinement",
      description: "Transform long, complex sentences into clear statements",
      duration: "5 minutes",
      type: "editing",
      difficulty: "Intermediate",
      points: 25,
      examples: [
        {
          before: "In order to facilitate the implementation of the new system, we need to ensure that all stakeholders are properly informed and trained.",
          after: "We need to inform and train all stakeholders before implementing the new system."
        }
      ]
    }
  ]

  const startExercise = (exercise: any) => {
    setCurrentExercise(exercise)
    setIsRecording(true)
    toast.success(`Starting ${exercise.title}`)
  }

  const completeExercise = (exercise: any, results: any) => {
    const exerciseResult = {
      id: exercise.id,
      title: exercise.title,
      score: results.score || 85,
      feedback: results.feedback || "Great job!",
      timestamp: new Date(),
      points: exercise.points
    }
    
    setExerciseResults(prev => [exerciseResult, ...prev])
    updateExperience(exercise.points)
    addAchievement(`Completed ${exercise.title}`)
    setCurrentExercise(null)
    setIsRecording(false)
    
    toast.success(`Exercise completed! +${exercise.points} XP`)
  }

  const getProgressPercentage = () => {
    const totalExercises = activeListeningExercises.length + nonverbalExercises.length + 
                          vocalDeliveryExercises.length + clarityExercises.length
    const completedExercises = exerciseResults.length
    return Math.round((completedExercises / totalExercises) * 100)
  }

  const getSectionProgress = (exercises: any[]) => {
    const completed = exerciseResults.filter(result => 
      exercises.some(ex => ex.id === result.id)
    ).length
    return Math.round((completed / exercises.length) * 100)
  }

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{moduleOverview.title}</h1>
            <p className="text-primary-100 text-lg mb-4">{moduleOverview.description}</p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {moduleOverview.duration}
              </div>
              <div className="flex items-center">
                <Trophy className="h-4 w-4 mr-2" />
                {moduleOverview.difficulty}
              </div>
              <div className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                {getProgressPercentage()}% Complete
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{getProgressPercentage()}%</div>
            <div className="text-primary-200">Progress</div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: Brain },
          { id: 'listening', label: 'Active Listening', icon: Ear },
          { id: 'nonverbal', label: 'Non-Verbal Cues', icon: Eye },
          { id: 'vocal', label: 'Vocal Delivery', icon: Volume2 },
          { id: 'clarity', label: 'Clarity & Conciseness', icon: Target }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md font-medium transition-colors ${
              activeSection === tab.id
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <tab.icon className="h-5 w-5 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Active Listening",
                description: "Focus, internalize, and confirm understanding",
                icon: Ear,
                color: "bg-blue-500",
                progress: getSectionProgress(activeListeningExercises),
                exercises: activeListeningExercises.length
              },
              {
                title: "Non-Verbal Cues",
                description: "Master body language and virtual presence",
                icon: Eye,
                color: "bg-green-500",
                progress: getSectionProgress(nonverbalExercises),
                exercises: nonverbalExercises.length
              },
              {
                title: "Vocal Delivery",
                description: "Perfect tone, pacing, and eliminate fillers",
                icon: Volume2,
                color: "bg-purple-500",
                progress: getSectionProgress(vocalDeliveryExercises),
                exercises: vocalDeliveryExercises.length
              },
              {
                title: "Clarity & Conciseness",
                description: "Get to the point with PREP method",
                icon: Target,
                color: "bg-orange-500",
                progress: getSectionProgress(clarityExercises),
                exercises: clarityExercises.length
              }
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveSection(skill.title.toLowerCase().replace(' ', '') as any)}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${skill.color} text-white mr-4`}>
                    <skill.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{skill.title}</h3>
                    <p className="text-sm text-gray-600">{skill.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{skill.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${skill.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{skill.exercises} exercises</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Active Listening Section */}
      {activeSection === 'listening' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Active Listening Exercises</h2>
            <div className="text-sm text-gray-600">
              {getSectionProgress(activeListeningExercises)}% Complete
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeListeningExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <div className="p-3 bg-blue-500 rounded-lg text-white mr-4">
                    <Ear className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{exercise.title}</h3>
                    <p className="text-gray-600 mb-3">{exercise.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {exercise.duration}
                        </div>
                        <div className="flex items-center">
                          <Trophy className="h-4 w-4 mr-1" />
                          {exercise.points} XP
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => startExercise(exercise)}
                      className="w-full btn-primary"
                    >
                      Start Exercise
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Non-Verbal Cues Section */}
      {activeSection === 'nonverbal' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Non-Verbal Cues Exercises</h2>
            <div className="text-sm text-gray-600">
              {getSectionProgress(nonverbalExercises)}% Complete
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nonverbalExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <div className="p-3 bg-green-500 rounded-lg text-white mr-4">
                    <Eye className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{exercise.title}</h3>
                    <p className="text-gray-600 mb-3">{exercise.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {exercise.duration}
                        </div>
                        <div className="flex items-center">
                          <Trophy className="h-4 w-4 mr-1" />
                          {exercise.points} XP
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => startExercise(exercise)}
                      className="w-full btn-primary"
                    >
                      Start Exercise
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Vocal Delivery Section */}
      {activeSection === 'vocal' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Vocal Delivery Exercises</h2>
            <div className="text-sm text-gray-600">
              {getSectionProgress(vocalDeliveryExercises)}% Complete
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vocalDeliveryExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <div className="p-3 bg-purple-500 rounded-lg text-white mr-4">
                    <Volume2 className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{exercise.title}</h3>
                    <p className="text-gray-600 mb-3">{exercise.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {exercise.duration}
                        </div>
                        <div className="flex items-center">
                          <Trophy className="h-4 w-4 mr-1" />
                          {exercise.points} XP
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => startExercise(exercise)}
                      className="w-full btn-primary"
                    >
                      Start Exercise
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Clarity & Conciseness Section */}
      {activeSection === 'clarity' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Clarity & Conciseness Exercises</h2>
            <div className="text-sm text-gray-600">
              {getSectionProgress(clarityExercises)}% Complete
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clarityExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <div className="p-3 bg-orange-500 rounded-lg text-white mr-4">
                    <Target className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{exercise.title}</h3>
                    <p className="text-gray-600 mb-3">{exercise.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {exercise.duration}
                        </div>
                        <div className="flex items-center">
                          <Trophy className="h-4 w-4 mr-1" />
                          {exercise.points} XP
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => startExercise(exercise)}
                      className="w-full btn-primary"
                    >
                      Start Exercise
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Exercise Results */}
      {exerciseResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Exercise Results</h3>
          <div className="space-y-3">
            {exerciseResults.slice(0, 5).map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{result.title}</h4>
                  <p className="text-sm text-gray-600">{result.feedback}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary-600">{result.score}%</div>
                  <div className="text-sm text-gray-500">+{result.points} XP</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Module1Foundation
