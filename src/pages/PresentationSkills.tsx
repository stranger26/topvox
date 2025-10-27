import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Presentation, 
  Target, 
  Clock, 
  Users, 
  TrendingUp,
  Play,
  Pause,
  RotateCcw,
  Award,
  BarChart3,
  Lightbulb,
  Volume2,
  Eye,
  Hand,
  CheckCircle
} from 'lucide-react'

const PresentationSkills: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const modules = [
    {
      id: 'structure',
      title: 'Presentation Structure',
      description: 'Learn to organize your content for maximum impact',
      icon: Target,
      color: 'bg-blue-500',
      lessons: [
        'Opening Hook',
        'Problem Statement',
        'Solution Framework',
        'Call to Action',
        'Q&A Preparation'
      ]
    },
    {
      id: 'visuals',
      title: 'Visual Design',
      description: 'Create compelling slides that support your message',
      icon: Presentation,
      color: 'bg-green-500',
      lessons: [
        'Slide Layout Principles',
        'Color Psychology',
        'Typography Best Practices',
        'Data Visualization',
        'Animation Techniques'
      ]
    },
    {
      id: 'delivery',
      title: 'Delivery Techniques',
      description: 'Master the art of engaging presentation delivery',
      icon: Volume2,
      color: 'bg-purple-500',
      lessons: [
        'Voice Modulation',
        'Body Language',
        'Eye Contact',
        'Hand Gestures',
        'Stage Movement'
      ]
    },
    {
      id: 'engagement',
      title: 'Audience Engagement',
      description: 'Keep your audience captivated throughout',
      icon: Users,
      color: 'bg-yellow-500',
      lessons: [
        'Interactive Elements',
        'Storytelling Techniques',
        'Question Handling',
        'Energy Management',
        'Closing Strong'
      ]
    }
  ]

  const quickTips = [
    {
      title: 'The 10-20-30 Rule',
      description: '10 slides, 20 minutes, 30pt font minimum',
      icon: Target
    },
    {
      title: 'Power of Three',
      description: 'Group information in threes for better retention',
      icon: CheckCircle
    },
    {
      title: 'Story Arc',
      description: 'Use beginning, middle, end structure',
      icon: TrendingUp
    }
  ]

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
              Presentation Skills 📊
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Master the art of compelling presentations from structure to delivery
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-primary-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Progress: {progress}%
                </span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Modules: 4
                </span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="text-4xl">📈</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Learning Modules */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
            >
              <div className="flex items-start">
                <div className={`p-3 rounded-lg ${module.color} text-white mr-4`}>
                  <module.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  
                  {activeModule === module.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2"
                    >
                      <h4 className="font-medium text-gray-900">Lessons:</h4>
                      <ul className="space-y-1">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" />
                            {lesson}
                          </li>
                        ))}
                      </ul>
                      <button className="btn-primary text-sm mt-3">
                        Start Module
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickTips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-start">
                <div className="p-2 bg-primary-100 rounded-lg mr-3">
                  <tip.icon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{tip.title}</h4>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Practice Exercises */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Practice Exercises</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Play className="h-5 w-5 mr-2 text-green-600" />
              Elevator Pitch Practice
            </h4>
            <p className="text-gray-600 mb-4">
              Practice delivering your key message in 30 seconds or less.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                2-3 minutes
              </div>
              <button className="btn-primary text-sm">
                Start Exercise
              </button>
            </div>
          </div>

          <div className="card">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Eye className="h-5 w-5 mr-2 text-blue-600" />
              Eye Contact Challenge
            </h4>
            <p className="text-gray-600 mb-4">
              Practice maintaining eye contact while speaking naturally.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                5 minutes
              </div>
              <button className="btn-primary text-sm">
                Start Exercise
              </button>
            </div>
          </div>

          <div className="card">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Hand className="h-5 w-5 mr-2 text-purple-600" />
              Gesture Practice
            </h4>
            <p className="text-gray-600 mb-4">
              Learn to use hand gestures effectively to emphasize points.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                3-4 minutes
              </div>
              <button className="btn-primary text-sm">
                Start Exercise
              </button>
            </div>
          </div>

          <div className="card">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Volume2 className="h-5 w-5 mr-2 text-orange-600" />
              Voice Projection
            </h4>
            <p className="text-gray-600 mb-4">
              Practice projecting your voice clearly and confidently.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                4-5 minutes
              </div>
              <button className="btn-primary text-sm">
                Start Exercise
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PresentationSkills
