import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotes, updateNote, deleteNote } from "../Endpoints/NotesAPI";
import { postSummarize } from "../Endpoints/SummarizeAPI";

// Fetch notes
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const data = await getNotes();
  return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

// Summarize
export const summarizeNote = createAsyncThunk(
  "notes/summarizeNote",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await postSummarize(id);
      await updateNote(id, { summary: response.summary });
      dispatch(fetchNotes());
      return { id, summary: response.summary };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete
export const removeNote = createAsyncThunk(
  "notes/removeNote",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await deleteNote(id);
      dispatch(fetchNotes());
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const editNote = createAsyncThunk(
  "notes/editNote",
  async ({ id, transcript }, { dispatch, rejectWithValue }) => {
    try {
      await updateNote(id, { transcript });
      dispatch(fetchNotes());
      return { id, transcript };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    items: [],
    loading: false,
    error: null,
    summarizingNote: null,
    summarizingError: null,
  },
  reducers: {
    setSummarizingNote: (state, action) => {
      state.summarizingNote = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Summarize
      .addCase(summarizeNote.pending, (state, action) => {
        state.summarizingNote = action.meta.arg;
        state.summarizingError = null;
      })
      .addCase(summarizeNote.fulfilled, (state) => {
        state.summarizingNote = null;
      })
      .addCase(summarizeNote.rejected, (state, action) => {
        state.summarizingNote = null;
        state.summarizingError = action.meta.arg;
      })

      // Delete
      .addCase(removeNote.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});



export const { setSummarizingNote } = notesSlice.actions;
export default notesSlice.reducer;
