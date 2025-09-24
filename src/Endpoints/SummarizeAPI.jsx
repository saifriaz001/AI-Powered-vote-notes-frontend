import { apiConnector } from "../ApiConnector/apiConnector";
import { SummarizeEndpoints } from "./endpoints";

const { POST_TRANSCRIBE, POST_SUMMARIZE } = SummarizeEndpoints;

// ✅ Send audio for transcription
export const postTranscribe = async (audioUrl) => {
  console.log("checking post transcribe url ->", POST_TRANSCRIBE);

  try {
    const response = await apiConnector(
      "POST",
      POST_TRANSCRIBE,
      { audioUrl },  // send JSON body
      { withCredentials: true }
    );

    console.log("Response from post transcribe:", response);

    if (response.status === 201 || response.status === 200) {
      console.log("Transcription created successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to transcribe:", response.data);
      throw new Error(`Unexpected status ${response.status}`);
    }
  } catch (error) {
    const serverMsg =
      error?.response?.data?.message ||
      error?.message ||
      "Error during transcription";

    console.error("Error during post transcribe:", error);
    const err = new Error(serverMsg);
    err.status = error?.response?.status;
    err.details = error?.response?.data;
    throw err;
  }
};

// ✅ Summarize a given text
export const postSummarize = async (noteId, text) => {
  console.log("checking post summarize url ->", `${POST_SUMMARIZE}/${noteId}`);

  try {
    const response = await apiConnector(
      "POST",
      `${POST_SUMMARIZE}/${noteId}`,  // ✅ attach ID in URL
      { text },                       // still pass text body if backend needs it
      { withCredentials: true }
    );

    console.log("Response from post summarize:", response);

    if (response.status === 201 || response.status === 200) {
      console.log("Summary created successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to summarize:", response.data);
      throw new Error(`Unexpected status ${response.status}`);
    }
  } catch (error) {
    const serverMsg =
      error?.response?.data?.message ||
      error?.message ||
      "Error during summarization";

    console.error("Error during post summarize:", error);
    const err = new Error(serverMsg);
    err.status = error?.response?.status;
    err.details = error?.response?.data;
    throw err;
  }
};