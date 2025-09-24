import React, { useState, useRef } from "react"
import { Mic, Square, Loader2 } from "lucide-react"

const Recorder = ({ onSave }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  // ✅ Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)

        if (onSave) {
          onSave(audioBlob) // Pass blob to parent (upload/transcribe)
        }
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Microphone access denied or unavailable.")
    }
  }

  // ✅ Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center gap-4">
      <h2 className=" recorder-Heading ">Voice Journal</h2>
      <p className="recorder-Paragraph">
        Wanna add a note? Just speak up!
      </p>

      {/* Record Button */}
      <div className="relative">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition"
          >
            <Mic className="w-8 h-8" />
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg transition animate-pulse"
          >
            <Square className="w-8 h-8" />
          </button>
        )}
      </div>
     </div>
  )
}

export default Recorder
