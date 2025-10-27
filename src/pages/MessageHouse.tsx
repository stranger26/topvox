import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building, 
  Target, 
  Users, 
  Lightbulb,
  CheckCircle,
  Plus,
  Edit,
  Save,
  Trash2,
  Share,
  Download,
  Eye
} from 'lucide-react'

interface MessageHouse {
  id: string
  title: string
  foundation: string
  pillars: string[]
  roof: string
  createdAt: Date
}

const MessageHouse: React.FC = () => {
  const [messageHouses, setMessageHouses] = useState<MessageHouse[]>([
    {
      id: '1',
      title: 'Product Launch Presentation',
      foundation: 'Our new product will revolutionize how teams collaborate',
      pillars: [
        'Solves real pain points in team collaboration',
        'Easy to use with minimal learning curve',
        'Integrates with existing tools seamlessly'
      ],
      roof: 'Join us in transforming the future of work',
      createdAt: new Date()
    }
  ])
  
  const [activeHouse, setActiveHouse] = useState<MessageHouse | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newHouse, setNewHouse] = useState<Partial<MessageHouse>>({
    title: '',
    foundation: '',
    pillars: ['', '', ''],
    roof: ''
  })

  const templates = [
    {
      name: 'Product Launch',
      description: 'Perfect for introducing new products or features',
      foundation: 'Our [product] will [key benefit]',
      pillars: [
        'Solves [specific problem]',
        'Easy to [main action]',
        'Integrates with [existing systems]'
      ],
      roof: 'Join us in [vision statement]'
    },
    {
      name: 'Team Update',
      description: 'Great for regular team meetings and updates',
      foundation: 'We have made significant progress on [project]',
      pillars: [
        'Completed [key milestone]',
        'Overcame [challenge]',
        'Next steps include [action items]'
      ],
      roof: 'We are on track to deliver [outcome]'
    },
    {
      name: 'Client Pitch',
      description: 'Ideal for client presentations and proposals',
      foundation: 'We understand your [challenge] and have a solution',
      pillars: [
        'Our approach addresses [specific need]',
        'Proven results with [evidence]',
        'Implementation plan that [benefit]'
      ],
      roof: 'Let\'s work together to achieve [mutual goal]'
    }
  ]

  const createNewHouse = () => {
    const house: MessageHouse = {
      id: Date.now().toString(),
      title: newHouse.title || 'Untitled Message House',
      foundation: newHouse.foundation || '',
      pillars: newHouse.pillars?.filter(p => p.trim()) || [],
      roof: newHouse.roof || '',
      createdAt: new Date()
    }
    
    setMessageHouses(prev => [house, ...prev])
    setActiveHouse(house)
    setIsEditing(true)
    setNewHouse({ title: '', foundation: '', pillars: ['', '', ''], roof: '' })
  }

  const updateHouse = (updates: Partial<MessageHouse>) => {
    if (!activeHouse) return
    
    const updatedHouse = { ...activeHouse, ...updates }
    setActiveHouse(updatedHouse)
    setMessageHouses(prev => 
      prev.map(house => house.id === activeHouse.id ? updatedHouse : house)
    )
  }

  const useTemplate = (template: any) => {
    setNewHouse({
      title: template.name,
      foundation: template.foundation,
      pillars: template.pillars,
      roof: template.roof
    })
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
              Module 4: Message House Framework 🏠
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Build structured, impactful messages that resonate with your audience
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Building className="h-5 w-5 text-primary-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Houses: {messageHouses.length}
                </span>
              </div>
              <div className="flex items-center">
                <Target className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Templates: 3
                </span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="text-4xl">🏗️</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Templates & Houses List */}
        <div className="lg:col-span-1 space-y-6">
          {/* Templates */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Templates</h3>
            <div className="space-y-3">
              {templates.map((template, index) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => useTemplate(template)}
                >
                  <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Your Message Houses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Houses</h3>
              <button
                onClick={createNewHouse}
                className="btn-primary text-sm flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                New House
              </button>
            </div>
            <div className="space-y-3">
              {messageHouses.map((house, index) => (
                <motion.div
                  key={house.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`card cursor-pointer transition-all ${
                    activeHouse?.id === house.id 
                      ? 'ring-2 ring-primary-500 bg-primary-50' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setActiveHouse(house)}
                >
                  <h4 className="font-medium text-gray-900 mb-1">{house.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{house.foundation}</p>
                  <p className="text-xs text-gray-500">
                    {house.createdAt.toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Message House Builder */}
        <div className="lg:col-span-2">
          {activeHouse ? (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {isEditing ? 'Edit' : 'View'} Message House
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-secondary text-sm flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    {isEditing ? 'View' : 'Edit'}
                  </button>
                  <button className="btn-secondary text-sm flex items-center">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </button>
                  <button className="btn-secondary text-sm flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </button>
                </div>
              </div>

              {/* Message House Visual */}
              <div className="mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  {/* Roof */}
                  <div className="text-center mb-4">
                    <div className="bg-primary-100 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Roof (Call to Action)
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={activeHouse.roof}
                          onChange={(e) => updateHouse({ roof: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="What do you want your audience to do?"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{activeHouse.roof}</p>
                      )}
                    </div>
                  </div>

                  {/* Pillars */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {activeHouse.pillars.map((pillar, index) => (
                      <div key={index} className="bg-green-100 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pillar {index + 1}
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={pillar}
                            onChange={(e) => {
                              const newPillars = [...activeHouse.pillars]
                              newPillars[index] = e.target.value
                              updateHouse({ pillars: newPillars })
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            placeholder={`Key point ${index + 1}`}
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{pillar}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Foundation */}
                  <div className="text-center">
                    <div className="bg-yellow-100 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Foundation (Core Message)
                      </label>
                      {isEditing ? (
                        <textarea
                          value={activeHouse.foundation}
                          onChange={(e) => updateHouse({ foundation: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          rows={3}
                          placeholder="What is your main message?"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{activeHouse.foundation}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* House Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  House Title
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={activeHouse.title}
                    onChange={(e) => updateHouse({ title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter a title for your message house"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{activeHouse.title}</p>
                )}
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex items-center space-x-3">
                  <button className="btn-primary flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                  <button className="btn-secondary flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="card text-center py-12">
              <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Message House Selected
              </h3>
              <p className="text-gray-600 mb-6">
                Choose a template or create a new message house to get started
              </p>
              <button
                onClick={createNewHouse}
                className="btn-primary flex items-center mx-auto"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New House
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageHouse
