import { StrictMode } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './store/userStore'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import PublicSpeaking from './pages/PublicSpeaking'
import PresentationSkills from './pages/PresentationSkills'
import MessageHouse from './pages/MessageHouse'
import Profile from './pages/Profile'
import Onboarding from './pages/Onboarding'
import Module1Foundation from './pages/Module1Foundation'

function App() {
  const { isOnboarded } = useUserStore()

  if (!isOnboarded) {
    return <Onboarding />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/module-1" element={<Module1Foundation />} />
            <Route path="/public-speaking" element={<PublicSpeaking />} />
            <Route path="/presentation-skills" element={<PresentationSkills />} />
            <Route path="/message-house" element={<MessageHouse />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App
