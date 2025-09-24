import { apiConnector } from "../ApiConnector/apiConnector";
import { NotesEndpoints } from "./endpoints";

const { POST_NOTES, GET_NOTES, UPDATE_NOTES, DELETE_NOTES } = NotesEndpoints;

// ✅ Create a new Note
export const postNote = async (payload) => {
  console.log("checking POST notes url ->", POST_NOTES);

  try {
    // const response = await apiConnector("POST", POST_NOTES, payload, null);

    // console.log("Response from post note:", response);

    if (response.status === 201) {
      // console.log("Note created successfully:", response.data);
      return response.data;
    } else {
      // console.error("Failed to create note:", response.data);
      throw new Error(`Unexpected status ${response.status}`);
    }
  } catch (error) {
    console.log("Error during post note:", error);
    throw error;
  }
};

// ✅ Get all Notes
export const getNotes = async () => {
  // console.log("checking GET notes url ->", GET_NOTES);

  try {
    const response = await apiConnector("GET", GET_NOTES, null, {
      withCredentials: true,
    });

    // console.log("Response from get notes:", response);

    if (response.status === 200) {
      // console.log("Notes fetched successfully:", response.data);
      return response.data;
    } else {
      // console.error("Failed to fetch notes:", response.data);
      throw new Error("Non-200 response");
    }
  } catch (error) {
    console.log("Error during get notes:", error);
    throw error;
  }
};

// ✅ Update a Note
export const updateNote = async (noteId, payload) => {
  // console.log("checking UPDATE notes url ->", `${UPDATE_NOTES}/${noteId}`);

  try {
    const response = await apiConnector("PUT", `${UPDATE_NOTES}/${noteId}`, payload, {
      withCredentials: true,
    });

    // console.log("Response from update note:", response);

    if (response.status === 200) {
      // console.log("Note updated successfully:", response.data);
      return response.data;
    } else {
      // console.error("Failed to update note:", response.data);
      throw new Error("Non-200 response");
    }
  } catch (error) {
    console.log("Error during update note:", error);
    throw error;
  }
};

// ✅ Delete a Note
export const deleteNote = async (noteId) => {
  // console.log("checking DELETE notes url ->", `${DELETE_NOTES}/${noteId}`);

  try {
    const response = await apiConnector("DELETE", `${DELETE_NOTES}/${noteId}`, undefined, {
      withCredentials: true,
    });

    // console.log("Response from delete note:", response);

    if (response.status === 200) {
      // console.log("Note deleted successfully:", response.data);
      return response.data;
    } else {
      // console.error("Failed to delete note:", response.data);
      throw new Error("Non-200 response");
    }
  } catch (error) {
    console.log("Error during delete note:", error);
    throw error;
  }
};
