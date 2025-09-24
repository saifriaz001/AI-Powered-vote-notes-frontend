import React from "react";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const NotesEndpoints = {
  GET_NOTES: `${BASE_URL}/api/notes/getNotes`,
  POST_NOTES: `${BASE_URL}/api/notes/createNote`,
  DELETE_NOTES: `${BASE_URL}/api/notes/deleteNote`,
  UPDATE_NOTES: `${BASE_URL}/api/notes/updateNote`,
};

export const SummarizeEndpoints = {
  POST_TRANSCRIBE: `${BASE_URL}/api/ai/transcribe`,
  POST_SUMMARIZE: `${BASE_URL}/api/ai/summarize`,
};



