import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Trophy, 
  Star, 
  TrendingUp, 
  Target,
  Award,
  BarChart3,
  Calendar,
  Clock,
  Edit,
  Save,
  Settings,
  LogOut
} from 'lucide-react'
import { useUserStore } from '../store/userStore'

const Profile: React.FC = () => {
  const { user, resetUser } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    difficulty: user?.preferences.difficulty || 'beginner',
    focusAreas: user?.preferences.focusAreas || []
  })

  const achievements = [
    { id: 'first_speech', title: 'First Speech', description: 'Completed your first practice session', icon: Trophy, earned: true, date: '2 days ago' },
    { id: 'confidence_king', title: 'Confidence King', description: 'Scored 85+ in confidence', icon: Star, earned: true, date: '1 week ago' },
    { id: 'message_master', title: 'Message Master', description: 'Created 3 structured messages', icon: Award, earned: true, date: '2 weeks ago' },
    { id: 'speaking_master', title: 'Speaking Master', description: 'Achieved 90+ overall score', icon: Trophy, earned: false, date: null },
    { id: 'streak_warrior', title: 'Streak Warrior', description: 'Practice for 7 days straight', icon: TrendingUp, earned: false, date: null },
    { id: 'presentation_pro', title: 'Presentation Pro', description: 'Complete all presentation modules', icon: Target, earned: false, date: null }
  ]

  const stats = [
    { label: 'Total Practice Time', value: '12h 30m', icon: Clock, color: 'text-blue-600' },
    { label: 'Sessions Completed', value: '24', icon: Target, color: 'text-green-600' },
    { label: 'Achievements', value: '3', icon: Trophy, color: 'text-yellow-600' },
    { label: 'Current Streak', value: '5 days', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Best Score', value: '87/100', icon: Star, color: 'text-orange-600' },
    { label: 'Level', value: user?.level.toString() || '1', icon: Award, color: 'text-red-600' }
  ]

  const recentActivity = [
    { action: 'Completed Public Speaking Practice', score: 87, date: '2 hours ago', type: 'practice' },
    { action: 'Unlocked Achievement: Confidence King', score: null, date: '1 day ago', type: 'achievement' },
    { action: 'Created Message House: Product Launch', score: null, date: '3 days ago', type: 'message' },
    { action: 'Completed Presentation Skills Module', score: 92, date: '1 week ago', type: 'module' },
    { action: 'Unlocked Achievement: Message Master', score: null, date: '2 weeks ago', type: 'achievement' }
  ]

  const focusAreas = [
    'Public Speaking',
    'Presentation Skills', 
    'Message Structure',
    'Voice & Tone',
    'Body Language',
    'Audience Engagement',
    'Storytelling',
    'Confidence Building'
  ]

  const handleSave = () => {
    // Update user data
    setIsEditing(false)
    // In a real app, this would save to backend
  }

  const handleLogout = () => {
    resetUser()
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'practice': return <Target className="h-4 w-4 text-blue-600" />
      case 'achievement': return <Trophy className="h-4 w-4 text-yellow-600" />
      case 'message': return <Award className="h-4 w-4 text-green-600" />
      case 'module': return <BarChart3 className="h-4 w-4 text-purple-600" />
      default: return <Star className="h-4 w-4 text-gray-600" />
    }
  }

  const toggleFocusArea = (area: string) => {
    setEditData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }))
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
          <div className="flex items-center">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mr-6">
              <span className="text-2xl font-bold text-primary-600">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user?.name || 'User'}
              </h1>
              <p className="text-lg text-gray-600 mb-2">{user?.email}</p>
              <div className="flex items-center space-x-4">
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
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats & Achievements */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Grid */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card text-center"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gray-100 ${stat.color} mb-3`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`card ${
                    achievement.earned 
                      ? 'bg-yellow-50 border-yellow-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${
                      achievement.earned 
                        ? 'bg-yellow-100 text-yellow-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <achievement.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className={`font-semibold ${
                        achievement.earned ? 'text-yellow-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${
                        achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                      {achievement.earned && achievement.date && (
                        <p className="text-xs text-yellow-600 mt-1">{achievement.date}</p>
                      )}
                    </div>
                    {achievement.earned && (
                      <div className="text-yellow-500">
                        <Trophy className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getActivityIcon(activity.type)}
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                    {activity.score && (
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{activity.score}/100</p>
                        <p className="text-sm text-gray-600">Score</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="space-y-6">
          {/* Profile Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select
                    value={editData.difficulty}
                    onChange={(e) => setEditData(prev => ({ ...prev, difficulty: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <button
                  onClick={handleSave}
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Name</p>
                  <p className="text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Experience Level</p>
                  <p className="text-gray-900 capitalize">{user?.preferences.difficulty}</p>
                </div>
              </div>
            )}
          </div>

          {/* Focus Areas */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Focus Areas</h3>
            <div className="space-y-2">
              {focusAreas.map((area) => (
                <label
                  key={area}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={editData.focusAreas.includes(area)}
                    onChange={() => toggleFocusArea(area)}
                    className="mr-3 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{area}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Settings className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">Notifications</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">Privacy</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">Data Export</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
