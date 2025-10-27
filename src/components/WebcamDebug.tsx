import React, { useState, useRef, useEffect } from 'react'
import { Camera, CameraOff, AlertCircle, CheckCircle } from 'lucide-react'

const WebcamDebug: React.FC = () => {
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [streamInfo, setStreamInfo] = useState<any>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startWebcam = async () => {
    try {
      setError(null)
      console.log('Starting webcam...')
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia not supported in this browser')
      }

      // Get available devices first
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter(device => device.kind === 'videoinput')
      
      console.log('Available video devices:', videoDevices)
      console.log('Browser:', navigator.userAgent)

      // Try with minimal constraints first
      let stream
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        })
        console.log('Got stream with basic constraints')
      } catch (basicError) {
        console.log('Basic constraints failed, trying specific ones...')
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640, min: 320 },
            height: { ideal: 480, min: 240 },
            facingMode: 'user'
          },
          audio: false
        })
        console.log('Got stream with specific constraints')
      }

      streamRef.current = stream
      console.log('Stream tracks:', stream.getTracks())
      
      if (videoRef.current) {
        console.log('Setting video source...')
        videoRef.current.srcObject = stream
        videoRef.current.muted = true
        videoRef.current.playsInline = true
        videoRef.current.autoplay = true
        
        // Add event listeners
        videoRef.current.onloadstart = () => console.log('Video load started')
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded, dimensions:', videoRef.current?.videoWidth, 'x', videoRef.current?.videoHeight)
          videoRef.current?.play().then(() => {
            console.log('Video play started')
            setIsStreaming(true)
          }).catch(playError => {
            console.error('Video play failed:', playError)
            setError('Video playback failed: ' + playError.message)
          })
        }
        
        videoRef.current.oncanplay = () => console.log('Video can play')
        videoRef.current.onplay = () => {
          console.log('Video is playing')
          setIsStreaming(true)
        }
        
        videoRef.current.onerror = (e) => {
          console.error('Video error:', e)
          setError('Video playback error')
        }

        // Force play after a short delay
        setTimeout(() => {
          if (videoRef.current && !videoRef.current.paused) {
            console.log('Video is already playing')
          } else {
            console.log('Attempting to force play video...')
            videoRef.current?.play().catch(console.error)
          }
        }, 1000)
      }

      // Get stream info
      const videoTrack = stream.getVideoTracks()[0]
      if (videoTrack) {
        const settings = videoTrack.getSettings()
        console.log('Video track settings:', settings)
        setStreamInfo({
          deviceId: videoTrack.getSettings().deviceId,
          width: settings.width,
          height: settings.height,
          frameRate: settings.frameRate,
          facingMode: settings.facingMode
        })
      }

    } catch (err: any) {
      console.error('Webcam error:', err)
      setError(err.message || 'Failed to access camera')
    }
  }

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsStreaming(false)
    setStreamInfo(null)
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
        Webcam Debug
      </h3>
      
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex space-x-2">
          <button
            onClick={startWebcam}
            disabled={isStreaming}
            className="btn-primary flex items-center"
          >
            <Camera className="h-4 w-4 mr-2" />
            Start Webcam
          </button>
          
          <button
            onClick={stopWebcam}
            disabled={!isStreaming}
            className="btn-secondary flex items-center"
          >
            <CameraOff className="h-4 w-4 mr-2" />
            Stop Webcam
          </button>
        </div>

        {/* Status */}
        <div className="flex items-center space-x-2">
          {isStreaming ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">Webcam Active</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-500">
              <CameraOff className="h-4 w-4 mr-1" />
              <span className="text-sm">Webcam Inactive</span>
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
        <div className="relative bg-gray-100 rounded-lg h-48 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
            onLoadStart={() => console.log('Video load start')}
            onLoadedData={() => console.log('Video data loaded')}
            onCanPlay={() => console.log('Video can play')}
            onPlay={() => console.log('Video playing')}
            onError={(e) => console.error('Video error:', e)}
          />
          {!isStreaming && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">No video stream</p>
                <p className="text-xs text-gray-400 mt-1">Click "Start Webcam" to begin</p>
              </div>
            </div>
          )}
        </div>

        {/* Debug Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <h4 className="text-sm font-medium text-yellow-900 mb-2">Debug Steps:</h4>
          <ol className="text-xs text-yellow-800 space-y-1">
            <li>1. Open browser developer tools (F12)</li>
            <li>2. Go to Console tab</li>
            <li>3. Click "Start Webcam" button</li>
            <li>4. Check console for error messages</li>
            <li>5. Look for "Starting webcam..." message</li>
          </ol>
        </div>

        {/* Stream Info */}
        {streamInfo && (
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Stream Information:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Resolution: {streamInfo.width}x{streamInfo.height}</div>
              <div>Frame Rate: {streamInfo.frameRate} fps</div>
              <div>Facing Mode: {streamInfo.facingMode}</div>
              <div>Device ID: {streamInfo.deviceId?.substring(0, 20)}...</div>
            </div>
          </div>
        )}

        {/* Troubleshooting Tips */}
        <div className="bg-blue-50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Troubleshooting Tips:</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Make sure your camera is not being used by another application</li>
            <li>• Check browser permissions for camera access</li>
            <li>• Try refreshing the page if video doesn't appear</li>
            <li>• Ensure you're using HTTPS or localhost</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WebcamDebug
