import React, { useState } from "react";
import Recorder from "../components/Recorder";
import { postTranscribe } from "../Endpoints/SummarizeAPI";
import { uploadAudioToCloudinary } from "../utils/cloudinary";

const TranscribePage = ({ onNoteCreated }) => {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("")
  const [visible, setVisible] = useState(false) // control fade out

  
// async function uploadAudioToCloudinary(file) {
//   const data = new FormData();
//   data.append("file", file);
//   data.append("upload_preset", "voiceNotes"); // your preset name
//   data.append("folder", "audio"); // optional, since you set folder=audio in preset

//   const res = await fetch(
//     "https://api.cloudinary.com/v1_1/dbylob0dp/auto/upload",
//     {
//       method: "POST",
//       body: data,
//     }
//   );

//   const json = await res.json();

//   if (json.secure_url) {
//     return json.secure_url; // ✅ Public URL of uploaded audio
//   } else {
//     throw new Error("Cloudinary upload failed: " + JSON.stringify(json));
//   }
// }


  const handleSave = async (audioBlob) => {
    setVisible(true)
    setProgress(30)
    setMessage("Uploading audio...")

    const audioFile = new File([audioBlob], "recording.wav", {
      type: "audio/wav",
    })


    const url = await uploadAudioToCloudinary(audioFile);
      console.log("Uploaded audio URL:", url)
    try {
      setProgress(60)
      setMessage("Transcribing audio...")

      const response = await postTranscribe(url)

      setProgress(100)
      setMessage("✅ Voice note created successfully!")

      console.log("Transcription result:", response)
      if (onNoteCreated) onNoteCreated()
    } catch (err) {
      console.error("Upload error:", err)
      setMessage("❌ Failed to create voice note")
    } finally {
      // hide after 3s
      setTimeout(() => {
        setVisible(false)
        setProgress(0)
        setMessage("")
      }, 3000)
    }
  }

  return (
    <div className="p-2 w-full md:max-w-6xl mx-auto">

        <Recorder onSave={handleSave} />

        {/* Progress + Message */}
        {visible && (
          <div className="w-full mt-4 transition-opacity duration-500">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-[#5c4e3d] h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-center mt-2">{message}</p>
          </div>
        )}
      </div>

  )
}

export default TranscribePage
