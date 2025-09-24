import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoteCard from "./NoteCard";
import TranscribePage from "@/pages/TranscribePage";
import { useNavigate } from "react-router-dom"; 
import ConfirmationModal from "@/reuseableSection/ConfirmationModal";
import StatusModal from "@/reuseableSection/StatusModal";
import { fetchNotes, summarizeNote, removeNote } from "../store/notesSlice";

const VoiceNoteHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: notes, loading, summarizingNote, summarizingError } =
    useSelector((state) => state.notes);


  const [modalState, setModalState] = useState({
    isOpen: false,
    message: "",
    isError: false,
  });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleSummarize = (id) => {
    dispatch(summarizeNote(id));
  };

  const handleDeleteRequest = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Confirm Deletion",
      message:
        "Are you sure you want to delete this Note? This action cannot be undone.",
      onConfirm: () => confirmDelete(id),
    });
  };

  const confirmDelete = async (id) => {
    try {
      await dispatch(removeNote(id)).unwrap();
      setModalState({
        isOpen: true,
        message: "Note deleted successfully.",
        isError: false,
      });
    } catch (err) {
      setModalState({
        isOpen: true,
        message: "Failed to delete this Note.",
        isError: true,
      });
    } finally {
      setConfirmModal({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: () => {},
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">

      <div className="mb-8">
        <TranscribePage onNoteCreated={() => dispatch(fetchNotes())} />
      </div>


      <h1 className="recorder-headingtwo">Recent Voice Notes</h1>

      {loading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <p className="text-gray-500">No notes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.slice(0, 3).map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onSummarize={handleSummarize}
              onDelete={handleDeleteRequest}
              summarizingNote={summarizingNote}
              summarizingError={summarizingError}
            />
          ))}
        </div>
      )}


      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate("/all-notes")}
          className="Load-More"
        >
          View All Notes
        </button>
      </div>

      <StatusModal
        isOpen={modalState.isOpen}
        message={modalState.message}
        isError={modalState.isError}
        onClose={() =>
          setModalState({ isOpen: false, message: "", isError: false })
        }
      />

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onClose={() =>
          setConfirmModal({
            isOpen: false,
            title: "",
            message: "",
            onConfirm: () => {},
          })
        }
        onConfirm={confirmModal.onConfirm}
        confirmText="Yes, Delete"
      />
    </div>
  );
};

export default VoiceNoteHome;
