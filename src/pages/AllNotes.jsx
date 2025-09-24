import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoteCard from "./NoteCard";
import ConfirmationModal from "@/reuseableSection/ConfirmationModal";
import StatusModal from "@/reuseableSection/StatusModal";
import {
  fetchNotes,
  summarizeNote,
  removeNote,
  editNote,
} from "../store/notesSlice";

const AllNotes = () => {
  const dispatch = useDispatch();
  const { items: notes, loading, summarizingNote, summarizingError } =
    useSelector((state) => state.notes);

  const [visibleCount, setVisibleCount] = useState(6);

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


  const handleUpdate = (id, transcript) => {
    dispatch(editNote({ id, transcript }));
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
      <h1 className="recorder-headingtwo"> All Notes</h1>

      {loading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <p className="text-gray-500">No notes found.</p>
      ) : (
        <>
          {/* Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.slice(0, visibleCount).map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onUpdate={handleUpdate}
                onDelete={handleDeleteRequest}
                onSummarize={handleSummarize}
                summarizingNote={summarizingNote}
                summarizingError={summarizingError}
              />
            ))}
          </div>

          {/* Load More / Show Less Button */}
          {notes.length > 6 && (
            <div className="flex justify-center mt-8">
              {visibleCount < notes.length ? (
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="Load-More"
                >
                  Load More
                </button>
              ) : (
                <button
                  onClick={() => setVisibleCount(6)}
                  className="Load-More"
                >
                  Show Less
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* Status Modal */}
      <StatusModal
        isOpen={modalState.isOpen}
        message={modalState.message}
        isError={modalState.isError}
        onClose={() =>
          setModalState({ isOpen: false, message: "", isError: false })
        }
      />

      {/* Confirmation Modal */}
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

export default AllNotes;
