import React, { useState, useRef, useEffect } from 'react'
import { Camera, CameraOff, AlertCircle, CheckCircle, Play } from 'lucide-react'

const SimpleWebcamTest: React.FC = () => {
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const addDebugInfo = (message: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
    console.log(message)
  }

  const startWebcam = async () => {
    try {
      setError(null)
      setDebugInfo([])
      addDebugInfo('Starting webcam test...')
      
      // Check basic support
      if (!navigator.mediaDevices) {
        throw new Error('navigator.mediaDevices not available')
      }
      
      if (!navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia not available')
      }

      addDebugInfo('getUserMedia is supported')

      // Try the most basic request first
      addDebugInfo('Requesting camera access...')
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })

      addDebugInfo('Camera access granted!')
      streamRef.current = stream

      // Check stream
      const videoTracks = stream.getVideoTracks()
      addDebugInfo(`Found ${videoTracks.length} video track(s)`)
      
      if (videoTracks.length === 0) {
        throw new Error('No video tracks in stream')
      }

      const track = videoTracks[0]
      const settings = track.getSettings()
      addDebugInfo(`Video settings: ${settings.width}x${settings.height} @ ${settings.frameRate}fps`)

      // Set up video element
      if (videoRef.current) {
        addDebugInfo('Setting up video element...')
        
        // Clear any existing stream first
        if (videoRef.current.srcObject) {
          videoRef.current.srcObject = null
        }
        
        // Set up video properties
        videoRef.current.muted = true
        videoRef.current.playsInline = true
        videoRef.current.autoplay = true
        videoRef.current.controls = false
        
        // Add event listeners BEFORE setting srcObject
        videoRef.current.onloadstart = () => addDebugInfo('Video load started')
        videoRef.current.onloadedmetadata = () => {
          addDebugInfo(`Video metadata loaded - dimensions: ${videoRef.current?.videoWidth}x${videoRef.current?.videoHeight}`)
          videoRef.current?.play().then(() => {
            addDebugInfo('Video started playing!')
            setIsStreaming(true)
          }).catch(playError => {
            addDebugInfo(`Video play failed: ${playError.message}`)
            setError(`Video play failed: ${playError.message}`)
          })
        }
        
        videoRef.current.oncanplay = () => addDebugInfo('Video can play')
        videoRef.current.onplay = () => {
          addDebugInfo('Video is now playing!')
          setIsStreaming(true)
        }
        
        videoRef.current.onerror = (e) => {
          addDebugInfo(`Video error: ${e}`)
          setError('Video element error')
        }
        
        videoRef.current.onstalled = () => addDebugInfo('Video stalled')
        videoRef.current.onwaiting = () => addDebugInfo('Video waiting')
        
        // Now set the stream
        videoRef.current.srcObject = stream
        addDebugInfo('Stream assigned to video element')
        
        // Force play after a delay
        setTimeout(() => {
          if (videoRef.current) {
            if (videoRef.current.paused) {
              addDebugInfo('Attempting to force play...')
              videoRef.current.play().catch(e => {
                addDebugInfo(`Force play failed: ${e.message}`)
              })
            } else {
              addDebugInfo('Video is already playing')
            }
          }
        }, 1000)
      } else {
        addDebugInfo('Video ref is null!')
        setError('Video element not found')
      }

    } catch (err: any) {
      addDebugInfo(`Error: ${err.message}`)
      setError(err.message)
    }
  }

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsStreaming(false)
    addDebugInfo('Webcam stopped')
  }

  useEffect(() => {
    return () => {
      stopWebcam()
    }
  }, [])

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Camera className="h-5 w-5 mr-2" />
        Simple Webcam Test
      </h3>
      
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex space-x-2">
          <button
            onClick={startWebcam}
            disabled={isStreaming}
            className="btn-primary flex items-center"
          >
            <Play className="h-4 w-4 mr-2" />
            Test Camera
          </button>
          
          <button
            onClick={stopWebcam}
            disabled={!isStreaming}
            className="btn-secondary flex items-center"
          >
            <CameraOff className="h-4 w-4 mr-2" />
            Stop
          </button>
        </div>

        {/* Status */}
        <div className="flex items-center space-x-2">
          {isStreaming ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">Camera Working!</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-500">
              <CameraOff className="h-4 w-4 mr-1" />
              <span className="text-sm">Camera Inactive</span>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center text-red-800">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Error: {error}</span>
            </div>
          </div>
        )}

        {/* Video Display */}
        <div className="relative bg-gray-100 rounded-lg h-48 overflow-hidden border-2 border-gray-300">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
            onLoadStart={() => addDebugInfo('Video element: load start')}
            onLoadedData={() => addDebugInfo('Video element: data loaded')}
            onCanPlay={() => addDebugInfo('Video element: can play')}
            onPlay={() => addDebugInfo('Video element: playing')}
            onError={(e) => addDebugInfo(`Video element: error - ${e}`)}
          />
          {!isStreaming && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">No video</p>
                <p className="text-xs text-gray-400">Click "Test Camera"</p>
              </div>
            </div>
          )}
        </div>

        {/* Debug Log */}
        <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Debug Log:</h4>
          <div className="text-xs text-gray-600 space-y-1">
            {debugInfo.length === 0 ? (
              <p className="text-gray-400">No debug info yet...</p>
            ) : (
              debugInfo.map((info, index) => (
                <div key={index} className="font-mono">{info}</div>
              ))
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-blue-50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Quick Tips:</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Make sure you allow camera access when prompted</li>
            <li>• Close other apps that might be using your camera</li>
            <li>• Try refreshing the page if it doesn't work</li>
            <li>• Check that your camera is not physically covered</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SimpleWebcamTest
