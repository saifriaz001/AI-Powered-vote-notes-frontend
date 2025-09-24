# 🎙️ Voice Journal App

A modern **Voice Notes Journal** built with React, Redux, Node.js, and Gemini AI.  
Record, store, and summarize your voice notes with a clean UI and Cloudinary integration for audio storage.  

---

## ✨ What Does This App Do?

This project is an **AI-powered voice recorder** with smart journaling features:

- 🎤 **Record your voice** directly from the browser using the built-in recorder.  
- ☁️ **Upload recordings** to Cloudinary (secure, shareable URL storage).  
- 🤖 **AI Transcription**: Every voice note is transcribed to text using **Gemini AI**.  
- 📝 **AI Summarization**: Long voice notes can be summarized into a quick, digestible version.  
- 🗂 **Note Management**: You can edit transcripts, delete notes, or browse all saved notes.  
- 🎨 **Modern UI** with Tailwind + shadcn components, including progress bars, modals, and custom audio player styles.  

The result? A personal **voice journal** where you just speak, and the app handles storage, transcription, and summaries.  

---

## 🧩 Why Redux Store?

We integrated **Redux Toolkit** to solve **prop drilling** and manage global state for notes.  

- 📥 **Fetch Notes**: All voice notes are fetched and stored in Redux.  
- 🔄 **Update Notes**: Edits to transcripts or summaries update state across the app.  
- ✂️ **Delete Notes**: Removes from both DB and UI in sync.  
- ⚡ **Summarize Notes**: Tracks summarization progress/error state for each note.  
- 🛠 **Centralized Logic**: All CRUD (Create, Read, Update, Delete) + summarize actions are handled in one place.  

This keeps the app **scalable and maintainable**, especially as features grow (tags, search, reminders, etc.).  

---

## 📸 Screenshots

### 🏠 Home (Recent Notes)
![Home Page](./assets/screenshots/imageHome.png)


### 🗂 All Notes
![All Notes Page](./assets/screenshots/imageAll.png)

###  Modal & 
![Recorder](./assets/screenshots/image.png)



---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Redux Toolkit (state management)
- Tailwind CSS + shadcn/ui + lucide-react
- Cloudinary API (audio uploads)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Gemini AI API (transcription + summarization)

---

## ⚡️ Routes

### Frontend Routes
- `/home` → Record and view **recent voice notes**  
- `/home/all-notes` → Browse, edit, and manage **all notes**  

### Backend API Routes
- `POST /api/transcribe` → Transcribe audio file / audio URL  
- `POST /api/summarize/:id` → Summarize a note  

---

## 🚀 Getting Started

### 1️⃣ Clone the repo For Frontend
```bash
git clone https://github.com/saifriaz001/AI-Powered-vote-notes-frontend.git
cd AI-FRONTEND
npm install 
npm run dev 

## ⚙️ Environment Variables (Frontend)

Create a `.env` file in the **frontend root** (same folder as `vite.config.js`) with the following:

```env
# Cloudinary (for audio uploads)
VITE_CLOUDINARY_UPLOAD_PRESET=voiceNotes
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_FOLDER=audio

# Backend API Base URL
VITE_API_BASE_URL=http://localhost:5000/api


###  Clone the repo For Backend
```bash
git clone https://github.com/saifriaz001/AI-Powered-vote-notes-backend.git
npm install 
npm run start

## ⚙️ Environment Variables (Frontend)

Create a `.env` file in the **frontend root** (same folder as `vite.config.js`) with the following:

```env
# Cloudinary (for audio uploads)
MONGO_URI=mongodb+srv://zaidaankhan70_db_user:USGcmAFGiX29d34R@cluster0.plh62u9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=4500
GEMINI_API_KEY=" "



