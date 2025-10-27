import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Trophy, Target, ArrowRight, Check } from 'lucide-react'
import { useUserStore } from '../store/userStore'

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    focusAreas: [] as string[]
  })
  const { setUser, completeOnboarding } = useUserStore()

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

  const handleSubmit = () => {
    const user = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      level: 1,
      experience: 0,
      achievements: [],
      preferences: {
        difficulty: formData.difficulty,
        focusAreas: formData.focusAreas
      }
    }
    
    setUser(user)
    completeOnboarding()
  }

  const toggleFocusArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8"
      >
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 4</span>
            <span className="text-sm font-medium text-gray-600">{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            <div className="mb-6">
              <div className="mx-auto h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-primary-600" />
              </div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome to Top Vox
                      </h1>
                      <p className="text-lg text-gray-600">
                        Master your communication skills with AI-powered training. Let's get you set up for success!
                      </p>
            </div>
            <button
              onClick={() => setStep(2)}
              className="btn-primary inline-flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        )}

        {/* Step 2: Personal Info */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about yourself</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.name || !formData.email}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Experience Level */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's your experience level?</h2>
            <div className="space-y-3">
              {[
                { value: 'beginner', label: 'Beginner', desc: 'New to public speaking and presentations' },
                { value: 'intermediate', label: 'Intermediate', desc: 'Some experience, looking to improve' },
                { value: 'advanced', label: 'Advanced', desc: 'Experienced speaker, want to refine skills' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.difficulty === option.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={option.value}
                    checked={formData.difficulty === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as any }))}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      formData.difficulty === option.value
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-gray-300'
                    }`}>
                      {formData.difficulty === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(2)}
                className="btn-secondary"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="btn-primary"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Focus Areas */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What would you like to focus on?</h2>
            <p className="text-gray-600 mb-6">Select all areas you'd like to improve (you can change this later)</p>
            <div className="grid grid-cols-2 gap-3">
              {focusAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => toggleFocusArea(area)}
                  className={`p-3 text-left border-2 rounded-lg transition-colors ${
                    formData.focusAreas.includes(area)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-900 bg-white'
                  }`}
                >
                  <div className="flex items-center">
                    {formData.focusAreas.includes(area) && (
                      <Check className="h-4 w-4 mr-2" />
                    )}
                    <span className="text-sm font-medium">{area}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(3)}
                className="btn-secondary"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="btn-primary"
              >
                Complete Setup
                <Check className="ml-2 h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Onboarding
