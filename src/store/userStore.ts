import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  level: number
  experience: number
  achievements: string[]
  preferences: {
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    focusAreas: string[]
  }
}

export interface UserStore {
  user: User | null
  isOnboarded: boolean
  setUser: (user: User) => void
  updateExperience: (points: number) => void
  addAchievement: (achievement: string) => void
  completeOnboarding: () => void
  resetUser: () => void
}

const defaultUser: User = {
  id: '',
  name: '',
  email: '',
  level: 1,
  experience: 0,
  achievements: [],
  preferences: {
    difficulty: 'beginner',
    focusAreas: []
  }
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isOnboarded: false,
      
      setUser: (user) => set({ user }),
      
      updateExperience: (points) => {
        const currentUser = get().user
        if (!currentUser) return
        
        const newExperience = currentUser.experience + points
        const newLevel = Math.floor(newExperience / 1000) + 1
        
        set({
          user: {
            ...currentUser,
            experience: newExperience,
            level: newLevel
          }
        })
      },
      
      addAchievement: (achievement) => {
        const currentUser = get().user
        if (!currentUser) return
        
        if (!currentUser.achievements.includes(achievement)) {
          set({
            user: {
              ...currentUser,
              achievements: [...currentUser.achievements, achievement]
            }
          })
        }
      },
      
      completeOnboarding: () => set({ isOnboarded: true }),
      
      resetUser: () => set({ user: null, isOnboarded: false })
    }),
    {
      name: 'comms-trainer-user',
      partialize: (state) => ({ 
        user: state.user, 
        isOnboarded: state.isOnboarded 
      })
    }
  )
)
