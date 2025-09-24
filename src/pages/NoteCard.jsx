import React, { useState , useEffect } from "react"
import { Pencil, Sparkles, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Modal from "../reuseableSection/Modal"
import { timeAgo } from "../utils/timeAgo"
import { useDispatch } from "react-redux";
import { editNote } from "../store/notesSlice";

const NoteCard = ({ note, onUpdate, onSummarize, onDelete ,summarizingNote, summarizingError }) => {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [editTranscript, setEditTranscript] = useState(note.transcript)
  const [progress, setProgress] = useState(0)
  const truncate = (text, limit = 100) =>
    text.length > limit ? text.substring(0, limit) + "..." : text

  useEffect(() => {
    let interval
    if (summarizingNote === note._id) {
      setProgress(0)
      interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev))
      }, 400)
    } else {
      setProgress(0)
    }
    return () => clearInterval(interval)
  }, [summarizingNote, note._id])

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between w-full  min-h-[280px]">
      <div className="flex-1 space-y-3">
        {/* Audio */}
        {note.audioUrl && (
          <audio
            controls
            src={note.audioUrl}
            className="w-full rounded"
          />
        )}

        {/* Transcript Preview */}
        <p
          className="modal-description cursor-pointer"
          onClick={() => setIsViewOpen(true)}
        >
          {truncate(note.transcript, 120)}
        </p>

        {/* Summary Preview */}
        {note.summary && (
          <div
            className="p-3 bg-gray-50 border rounded-md cursor-pointer"
            onClick={() => setIsViewOpen(true)}
          >
            <h4 className="modal-title mb-1">Summary</h4>
            <p className="modal-description">
              {truncate(note.summary, 120)}
            </p>
          </div>
        )}

        {summarizingNote === note._id && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <Loader2 className="animate-spin h-3 w-3 text-purple-500" />
              Summarizing...
            </p>
          </div>
        )}

        {summarizingError === note._id && (
  <div className="mt-3">
    <p className="text-xs text-red-500 flex items-center gap-1">
      ❌ model gets OverHeated. Try again in a while.
      <button
        onClick={() => onSummarize(note._id)}
        className="ml-2 underline text-blue-500"
      >
        Retry
      </button>
    </p>
  </div>
)}
      </div>

      {/* Footer (Time + Actions) */}
      <div className="mt-4 flex justify-between items-center">
        <p className="modal-description">{timeAgo(note.createdAt)}</p>

        <div className="flex gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onSummarize(note._id)}
            disabled={!!note.summary}
          >
            <Sparkles className="h-5 w-5 text-purple-500" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setIsEditOpen(true)}>
            <Pencil className="h-5 w-5 text-yellow-500" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => onDelete(note._id)}>
            <Trash2 className="h-5 w-5 text-red-500" />
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        title="Edit Transcript"
        onClose={() => setIsEditOpen(false)}
        onSave={() => {
          dispatch(editNote({ id: note._id, transcript: editTranscript }));
          setIsEditOpen(false)
        }}
      >
        <textarea
          value={editTranscript}
          onChange={(e) => setEditTranscript(e.target.value)}
          rows={6}
          className="edit-description"
        />
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewOpen} title="Note Details" onClose={() => setIsViewOpen(false)}>
        <h4 className="modal-title">Transcript</h4>
        <p className="modal-description">{note.transcript}</p>

        {note.summary && (
          <>
            <h4 className="modal-title">Summary</h4>
            <p className="modal-description">{note.summary}</p>
          </>
        )}
      </Modal>
    </div>
  )
}

export default NoteCard
