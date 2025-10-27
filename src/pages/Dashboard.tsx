import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Mic, 
  Presentation, 
  Building, 
  Trophy, 
  Star, 
  TrendingUp,
  Target,
  Clock,
  Award,
  BarChart3
} from 'lucide-react'
import { useUserStore } from '../store/userStore'

const Dashboard: React.FC = () => {
  const { user } = useUserStore()

  const trainingModules = [
    {
      title: 'Public Speaking',
      description: 'Practice speaking with confidence and clarity',
      icon: Mic,
      href: '/public-speaking',
      color: 'bg-blue-500',
      progress: 65,
      difficulty: 'Intermediate'
    },
    {
      title: 'Presentation Skills',
      description: 'Master the art of compelling presentations',
      icon: Presentation,
      href: '/presentation-skills',
      color: 'bg-green-500',
      progress: 40,
      difficulty: 'Beginner'
    },
    {
      title: 'Message House',
      description: 'Build structured, impactful messages',
      icon: Building,
      href: '/message-house',
      color: 'bg-purple-500',
      progress: 80,
      difficulty: 'Advanced'
    }
  ]

  const recentAchievements = [
    { title: 'First Speech', description: 'Completed your first practice session', icon: Trophy, date: '2 days ago' },
    { title: 'Confidence Builder', description: 'Spoke for 5 minutes without hesitation', icon: Star, date: '1 week ago' },
    { title: 'Message Master', description: 'Created 3 structured messages', icon: Award, date: '2 weeks ago' }
  ]

  const stats = [
    { label: 'Total Practice Time', value: '12h 30m', icon: Clock, color: 'text-blue-600' },
    { label: 'Sessions Completed', value: '24', icon: Target, color: 'text-green-600' },
    { label: 'Achievements', value: '8', icon: Trophy, color: 'text-yellow-600' },
    { label: 'Current Streak', value: '5 days', icon: TrendingUp, color: 'text-purple-600' }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-bg rounded-2xl p-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Ready to level up your communication skills? Let's continue your journey.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-primary-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Level {user?.level}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">{user?.experience} XP</span>
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Training Modules */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Training Modules</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {trainingModules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <Link to={module.href} className="block">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${module.color} text-white`}>
                    <module.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                    <p className="text-sm text-gray-600">{module.difficulty}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{module.description}</p>
                
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{module.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${module.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center text-primary-600 font-medium">
                  Continue Training
                  <BarChart3 className="ml-2 h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                  <achievement.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/public-speaking"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Mic className="h-5 w-5 text-blue-600 mr-3" />
            <span className="font-medium">Start Speaking Practice</span>
          </Link>
          <Link
            to="/message-house"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Building className="h-5 w-5 text-purple-600 mr-3" />
            <span className="font-medium">Build a Message</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="h-5 w-5 text-green-600 mr-3" />
            <span className="font-medium">View Progress</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
